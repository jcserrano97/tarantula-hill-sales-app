export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.json({
    message: 'Debug endpoint working',
    environment: process.env.NODE_ENV,
    hasGoogleKey: !!process.env.GOOGLE_PLACES_API_KEY,
    googleKeyLength: process.env.GOOGLE_PLACES_API_KEY ? process.env.GOOGLE_PLACES_API_KEY.length : 0,
    timestamp: new Date().toISOString()
  });
}