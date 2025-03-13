require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ Middleware
app.use(express.json()); // Parse JSON data

// ✅ Properly Configure CORS
const allowedOrigins = [
  "https://herworld-women.vercel.app", 
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
app.get('/', (req, res) => {
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

// ✅ Error Handling for CORS (Fixes Preflight Issue)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins.join(",")); // 🔥 Set allowed origins
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // ✅ Handle preflight requests
  }

  next();
});

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  .on('error', (err) => {
    console.error(`Server error: ${err.message}`);
  });
