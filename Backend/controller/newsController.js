const axios = require('axios');

const getNews = async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

const createNews = async (req, res) => {
  // Your logic to create news
  res.status(201).json({ message: 'News created successfully' });
};

module.exports = { getNews, createNews };