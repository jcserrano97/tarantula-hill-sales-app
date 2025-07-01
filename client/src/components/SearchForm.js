import React, { useState } from 'react';
import './SearchForm.css';

const VENUE_TYPES = [
  'Bars & Pubs',
  'Restaurants', 
  'Breweries',
  'Stadiums & Arenas',
  'Hotels',
  'Event Venues',
  'Golf Courses',
  'Music Venues',
  'Liquor Stores',
  'Sports Clubs'
];

const SearchForm = ({ onSearch, loading }) => {
  const [zipCode, setZipCode] = useState('');
  const [selectedVenueTypes, setSelectedVenueTypes] = useState([]);

  const handleVenueTypeChange = (venueType) => {
    setSelectedVenueTypes(prev => 
      prev.includes(venueType) 
        ? prev.filter(type => type !== venueType)
        : [...prev, venueType]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (zipCode.trim() && selectedVenueTypes.length > 0) {
      onSearch({ zipCode: zipCode.trim(), venueTypes: selectedVenueTypes });
    }
  };

  return (
    <div className="search-form-container">
      <h1>Find Sales Leads</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label htmlFor="zipCode">Zip Code *</label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter zip code (e.g., 90210)"
            pattern="[0-9]{5}"
            required
          />
        </div>

        <div className="form-group">
          <label>Venue Types * (Select at least one)</label>
          <div className="venue-types-grid">
            {VENUE_TYPES.map(type => (
              <label key={type} className="venue-type-checkbox">
                <input
                  type="checkbox"
                  checked={selectedVenueTypes.includes(type)}
                  onChange={() => handleVenueTypeChange(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          className="search-button"
          disabled={loading || !zipCode.trim() || selectedVenueTypes.length === 0}
        >
          {loading ? 'Searching...' : 'Search Leads'}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;