require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// ✅ Debugging Log
console.log("✅ Server file loaded");

// ✅ Middleware
app.use(express.json());

// ✅ Properly Configure CORS
const allowedOrigins = [
  "https://herworld-women.vercel.app", // 🔥 Corrected typo
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // 🔥 Allow cookies (important for JWT auth)
}));

// ✅ Connect Database
connectDB();

// ✅ Test Route
app.get('/api', (req, res) => {
  res.send("API is running...");
});

// ✅ Routes
const userRoutes = require('./routes/userRoutes');
const forumRoutes = require('./routes/forumRoutes');
const newsRoutes = require('./routes/newsRoutes');
const businessIdeaRoutes = require('./routes/businessIdeaRoutes');

app.use('/api/users', userRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/businessIdeas', businessIdeaRoutes);

// ✅ Export app for Vercel (REMOVED app.listen())
module.exports = app;