import React, { useState } from 'react';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const handlePostSubmit = () => {
    if (newPost.trim() !== '') {
      setPosts([{ text: newPost, id: Date.now() }, ...posts]);
      setNewPost('');
    }
  };
  return (
    <div>
      <h2>Community Forum</h2>
      <textarea
        placeholder="Share your experience or safety tips..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      <button onClick={handlePostSubmit}>Post</button>

      <div>
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to share!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <p>{post.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Forum;
