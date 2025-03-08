require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(express.json()); // Parse JSON data
app.use(cors()); // Allow frontend to communicate with backend
const allowedOrigins = [
  "https://herworld-women.vercel.app/", 
  "http://localhost:3000" 
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
  credentials: true // If using cookies/sessions
}));
// Connect Database
connectDB();

// Test Route
app.get('/', (req, res) => {
  res.send("API is running...");
});
const userRoutes = require('./routes/userRoutes');
const forumRoutes = require('./routes/forumRoutes');
const newsRoutes = require('./routes/newsRoutes'); // Corrected path
const businessIdeaRoutes = require('./routes/businessIdeaRoutes');
app.use('/api/users', userRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/news', newsRoutes); // Corrected path
app.use('/api/businessIdeas', businessIdeaRoutes);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Port Configuration
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  .on('error', (err) => {
    console.error(`Server error: ${err.message}`);
  });

