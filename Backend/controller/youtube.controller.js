const axios = require("axios");

exports.getVideosByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    const searchQueries = {
      Rangoli: [
        "rangoli designs for beginners",
        "easy rangoli for festivals",
        "creative rangoli ideas"
      ],
      Mehndi: [
        "mehndi design tutorial",
        "simple mehndi designs",
        "bridal mehndi patterns"
      ],
      Recipes: [
        "easy indian recipes",
        "healthy recipes for women",
        "quick home cooking ideas"
      ],
    };

    const queries =
      searchQueries[category] || ["women lifestyle tutorials"];

    const q = queries[Math.floor(Math.random() * queries.length)];

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q,
          type: "video",
          maxResults: 9,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    const videos = response.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      url: `https://www.youtube.com/embed/${item.id.videoId}`,
    }));

    res.json(videos);
  } catch (error) {
    console.error("YouTube API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};
