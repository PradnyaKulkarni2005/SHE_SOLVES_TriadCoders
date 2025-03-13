require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // 👈 Needed for handling JWT in cookies
const path = require('path');

const app = express();

// ✅ 1. Connect to Database BEFORE Middleware
connectDB();

// ✅ 2. Middleware
app.use(express.json()); // Parses JSON requests
app.use(cookieParser()); // 👈 Allows reading cookies

// ✅ 3. CORS Setup (Only Declare Once)
const allowedOrigins = [
  "https://herworld-women.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // 👈 Allows sending cookies with requests
}));

// ✅ 4. Test Route
app.get('/', (req, res) => {
  res.send("API is running...");
});

// ✅ 5. Import Routes
const userRoutes = require('./routes/userRoutes');
const forumRoutes = require('./routes/forumRoutes');
const newsRoutes = require('./routes/newsRoutes');
const businessIdeaRoutes = require('./routes/businessIdeaRoutes');

// ✅ 6. Set Up Routes
app.use('/api/users', userRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/businessIdeas', businessIdeaRoutes);

// ✅ 7. Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  .on('error', (err) => {
    console.error(`Server error: ${err.message}`);
  });