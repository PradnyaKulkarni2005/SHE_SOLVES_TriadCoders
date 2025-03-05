const express = require('express');
const router = express.Router();
const { getNews, createNews } = require('../controller/newsController'); // Corrected path

router.get('/', getNews);
router.post('/', createNews);

module.exports = router;