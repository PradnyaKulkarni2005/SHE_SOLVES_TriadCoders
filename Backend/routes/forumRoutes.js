const express = require('express');
const router = express.Router();
const ForumPost = require('../models/ForumPost');

// Create Forum Post
router.post('/create', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new ForumPost({ title, content, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
});

// Get All Forum Posts
router.get('/', async (req, res) => {
  try {
    const posts = await ForumPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});

module.exports = router;