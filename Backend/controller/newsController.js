const axios = require('axios');
const https = require('https'); // Import the https module
require('dotenv').config();

exports.getNews = async (req, res) => {
    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            return res.status(400).json({ message: "API key is missing" });
        }

        const { q = 'women', language = 'en', pageSize = 10, page = 1 } = req.query;

        const url = `https://newsapi.org/v2/everything?q=${q}&language=${language}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

        // Create an HTTPS agent to bypass SSL verification
        const agent = new https.Agent({
            rejectUnauthorized: false, // Disable SSL verification
        });

        const response = await axios.get(url, { httpsAgent: agent });

        const articles = response.data.articles.map((article) => ({
            title: article.title,
            description: article.description,
            link: article.url,
            image: article.urlToImage,
            publishedAt: article.publishedAt,
            source: article.source.name,
        }));

        res.json({
            status: 'success',
            totalResults: response.data.totalResults,
            articles,
        });
    } catch (error) {
        console.error('Error fetching news:', error.message);

        if (error.response) {
            res.status(error.response.status).json({
                message: "Error from NewsAPI",
                error: error.response.data,
            });
        } else if (error.request) {
            res.status(500).json({ message: "No response from NewsAPI", error: error.message });
        } else {
            res.status(500).json({ message: "Error fetching news", error: error.message });
        }
    }
};