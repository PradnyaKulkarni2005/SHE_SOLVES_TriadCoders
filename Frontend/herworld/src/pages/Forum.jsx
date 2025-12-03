import React, { useState, useEffect } from "react";
import { MessageSquare, Send, Users, TrendingUp } from "lucide-react";

// ✅ Dynamically Set API URL Based on Environment
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/forum"
    : "https://she-solves-triad-coders.vercel.app/api/forum";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async () => {
    if (newPost.trim() !== "") {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Post Title",
            content: newPost,
            author: "Anonymous",
          }),
        });
        const data = await response.json();
        setPosts([data, ...posts]);
        setNewPost("");
      } catch (error) {
        console.error("Error creating post:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handlePostSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Community Forum
          </h1>
          <p className="text-gray-600 text-lg">
            Share experiences, safety tips, and connect with others
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Members</p>
                <p className="text-2xl font-bold text-gray-900">1.2k</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Today</p>
                <p className="text-2xl font-bold text-gray-900">84</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Create Post Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8 hover:shadow-xl transition-shadow">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                A
              </div>
            </div>
            <div className="flex-1">
              <textarea
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all text-gray-800 placeholder-gray-400"
                rows="4"
                placeholder="Share your experience, safety tips, or ask a question..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500">
                  Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl + Enter</kbd> to post
                </p>
                <button
                  onClick={handlePostSubmit}
                  disabled={!newPost.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2 shadow-md hover:shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Post</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No posts yet
              </h3>
              <p className="text-gray-500">
                Be the first to share your thoughts with the community!
              </p>
            </div>
          ) : (
            posts.map((post, index) => (
              <div
                key={post._id || index}
                className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all hover:border-purple-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                      {post.author?.charAt(0).toUpperCase() || "A"}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-gray-900">
                        {post.author || "Anonymous"}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-500">Just now</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {post.content}
                    </p>
                    <div className="flex items-center space-x-6 mt-4 text-sm text-gray-500">
                      <button className="hover:text-purple-600 transition-colors flex items-center space-x-1">
                        <span>👍</span>
                        <span>Like</span>
                      </button>
                      <button className="hover:text-purple-600 transition-colors flex items-center space-x-1">
                        <span>💬</span>
                        <span>Reply</span>
                      </button>
                      <button className="hover:text-purple-600 transition-colors flex items-center space-x-1">
                        <span>🔗</span>
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;