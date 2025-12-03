process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Debugging Log
console.log("Server file loaded");

// Middleware
app.use(express.json());

// ✅ Allow Local & Hosted Frontend Origins
const allowedOrigins = [
  "http://localhost:5173",  // Local development
  "https://herworld-women.vercel.app" 
];

app.use(cors({
  origin: allowedOrigins,  // Allow both local & deployed frontend
  credentials: true,  // Allow cookies (JWT tokens)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization"
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

// ✅ Export app for Vercel
module.exports = app;

// ✅ Start Server Locally (Only in Development)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
