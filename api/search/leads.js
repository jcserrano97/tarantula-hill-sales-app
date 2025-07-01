const axios = require('axios');

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

// Venue type mapping for Google Places API
const venueTypeMap = {
  'Bars & Pubs': ['bar', 'night_club'],
  'Restaurants': ['restaurant', 'meal_takeaway', 'meal_delivery'],
  'Breweries': ['bar', 'liquor_store'],
  'Stadiums & Arenas': ['stadium'],
  'Hotels': ['lodging'],
  'Event Venues': ['event_venue'],
  'Golf Courses': ['golf_course'],
  'Music Venues': ['night_club', 'entertainment'],
  'Liquor Stores': ['liquor_store'],
  'Sports Clubs': ['gym', 'sports_club']
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { zipCode, venueTypes } = req.body;

    if (!zipCode || !venueTypes || venueTypes.length === 0) {
      return res.status(400).json({ 
        message: 'Zip code and at least one venue type are required' 
      });
    }

    if (!GOOGLE_PLACES_API_KEY) {
      return res.status(500).json({ 
        message: 'Google Places API key not configured' 
      });
    }

    // Convert venue types to Google Places types
    const googleTypes = venueTypes.flatMap(type => venueTypeMap[type] || []);
    
    if (googleTypes.length === 0) {
      return res.status(400).json({ 
        message: 'Invalid venue types provided' 
      });
    }

    const allResults = [];

    // Search for each venue type
    for (const type of googleTypes) {
      try {
        const searchUrl = `${GOOGLE_PLACES_BASE_URL}/textsearch/json`;
        const response = await axios.get(searchUrl, {
          params: {
            query: `${type} in ${zipCode}`,
            key: GOOGLE_PLACES_API_KEY,
            type: type
          }
        });

        if (response.data.results) {
          allResults.push(...response.data.results);
        }
      } catch (error) {
        console.error(`Error searching for ${type}:`, error.message);
      }
    }

    // Remove duplicates based on place_id
    const uniqueResults = allResults.reduce((acc, current) => {
      const existing = acc.find(item => item.place_id === current.place_id);
      if (!existing) {
        acc.push(current);
      }
      return acc;
    }, []);

    // Get detailed information for each place
    const detailedResults = await Promise.all(
      uniqueResults.slice(0, 20).map(async (place) => {
        try {
          const detailsUrl = `${GOOGLE_PLACES_BASE_URL}/details/json`;
          const detailsResponse = await axios.get(detailsUrl, {
            params: {
              place_id: place.place_id,
              fields: 'name,formatted_address,formatted_phone_number,website,email',
              key: GOOGLE_PLACES_API_KEY
            }
          });

          const details = detailsResponse.data.result;
          return {
            id: place.place_id,
            name: details.name || place.name,
            address: details.formatted_address || place.formatted_address,
            phone: details.formatted_phone_number || null,
            email: details.email || null,
            website: details.website || null,
            rating: place.rating || null,
            status: 'New'
          };
        } catch (error) {
          console.error(`Error getting details for ${place.name}:`, error.message);
          return {
            id: place.place_id,
            name: place.name,
            address: place.formatted_address,
            phone: null,
            email: null,
            website: null,
            rating: place.rating || null,
            status: 'New'
          };
        }
      })
    );

    res.json({
      success: true,
      results: detailedResults,
      count: detailedResults.length
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      message: 'Error searching for leads',
      error: error.message 
    });
  }
}