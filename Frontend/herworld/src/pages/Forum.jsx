import React, { useState } from "react";
import "./Forum.css"; // Import the CSS file

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setPosts([{ text: newPost, id: Date.now() }, ...posts]);
      setNewPost("");
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
            <div key={post.id} className="forum-post">
              <p className="forum-post-text">{post.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Forum;
