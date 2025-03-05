const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController'); // Import the controller

// Route to fetch news
router.get('/', newsController.getNews);

module.exports = router;