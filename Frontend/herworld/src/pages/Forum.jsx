import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Forum.css"; // Import the CSS file

// ✅ Dynamically Set API URL Based on Environment
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/forum" // Local development
    : "https://she-solves-triad-coders.vercel.app/api/forum"; // Hosted backend (Replace with actual link)

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async () => {
    if (newPost.trim() !== "") {
      try {
        const response = await axios.post(`${API_BASE_URL}/create`, {
          title: "Post Title", // You can add a title input if needed
          content: newPost,
          author: "Anonymous", // You can replace this with the actual author
        });
        setPosts([response.data, ...posts]);
        setNewPost("");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  return (
    <div className="forum-container">
      <h2 className="forum-title">Community Forum</h2>
      
      <textarea
        className="forum-textarea"
        placeholder="Share your experience or safety tips..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />

      <button className="forum-button" onClick={handlePostSubmit}>
        Post
      </button>

      <div className="forum-post-container">
        {posts.length === 0 ? (
          <p className="forum-empty-message">No posts yet. Be the first to share!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="forum-post">
              <p className="forum-post-text">{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Forum;
