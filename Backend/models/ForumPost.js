const mongoose = require('mongoose');

const forumPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now },
});

const ForumPost = mongoose.model('ForumPost', forumPostSchema);
module.exports = ForumPost;