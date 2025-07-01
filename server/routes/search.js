const express = require('express');
const router = express.Router();
const { searchLeads } = require('../controllers/searchController');

// POST /api/search/leads
router.post('/leads', searchLeads);

module.exports = router;