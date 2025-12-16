import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================
   API BASE URL
========================= */
const API_BASE_URL =
  import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "https://she-solves-triad-coders.vercel.app/api";

/* =========================
   CATEGORIES
========================= */
const categories = [
  { name: "Rangoli", icon: "🎨", color: "from-pink-400 to-rose-400" },
  { name: "Mehndi", icon: "✋", color: "from-purple-400 to-pink-400" },
  { name: "Recipes", icon: "🍳", color: "from-orange-400 to-pink-400" },
];

const VideoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("Rangoli");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentCategory = categories.find(
    (category) => category.name === selectedCategory
  );

  /* =========================
     FETCH VIDEOS
  ========================= */
  useEffect(() => {
    setLoading(true);

    fetch(`${API_BASE_URL}/videos/youtube?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setVideos(Array.isArray(data) ? data : []))
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.9,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">

      {/* Background blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], x: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0], x: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-pink-300/20 rounded-full blur-3xl"
      />

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-800 mb-4">
              Video{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Categories
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              Discover inspiring tutorials curated just for you
            </p>
          </div>

          {/* CATEGORY BUTTONS */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-4 rounded-2xl font-bold transition-all ${
                  selectedCategory === category.name
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : "bg-white text-gray-700 border-2 border-gray-200"
                }`}
              >
                <span className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">{category.icon}</span>
                  {category.name}
                </span>
              </motion.button>
            ))}
          </div>

          {/* VIDEO GRID */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {loading ? (
                <div className="col-span-full text-center text-gray-600">
                  Loading videos...
                </div>
              ) : videos.length > 0 ? (
                videos.map((video, index) => (
                  <motion.div
                    key={video.id || index}
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group bg-white rounded-3xl overflow-hidden shadow-lg border"
                  >
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 rounded-full shadow">
                      <span
                        className={`text-xs font-bold bg-gradient-to-r ${currentCategory.color} bg-clip-text text-transparent`}
                      >
                        {currentCategory.icon} {selectedCategory}
                      </span>
                    </div>

                    {/* Video */}
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full"
                        src={video.url}
                        title={video.title}
                        allowFullScreen
                      />
                    </div>

                    {/* Title */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
                        {video.title}
                      </h2>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-600">
                  No videos available for this category.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
