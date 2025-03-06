import React, { useState } from "react";
import rangoliVdo from "../data/rangoliVdo.json";
import mehndiVdo from "../data/mehandiVdo.json";
import recipeVdo from "../data/recipeVdo.json";
import "./VideoGallery.css"; // Import CSS file

const categories = [
  { name: "Rangoli", data: rangoliVdo },
  { name: "Mehndi", data: mehndiVdo },
  { name: "Recipes", data: recipeVdo },
];

const VideoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("Rangoli");

  const currentVideos = categories.find(
    (category) => category.name === selectedCategory
  )?.data || [];

  return (
    <div className="gallery-container">
      <h1 className="title">Video Categories</h1>

      {/* Category Buttons */}
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`category-btn ${
              selectedCategory === category.name ? "active" : ""
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="video-grid">
        {currentVideos.length > 0 ? (
          currentVideos.map((video, index) => (
            <div key={index} className="video-card">
              <h2 className="video-title">{video.title}</h2>
              <iframe
                className="video-frame"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ))
        ) : (
          <p className="no-videos">No videos available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default VideoGallery;
