import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import rangoliVdo from "../data/rangoliVdo.json";
import mehndiVdo from "../data/mehandiVdo.json";
import recipeVdo from "../data/recipeVdo.json";

const categories = [
  { 
    name: "Rangoli", 
    data: rangoliVdo,
    icon: "🎨",
    color: "from-pink-400 to-rose-400",
  },
  { 
    name: "Mehndi", 
    data: mehndiVdo,
    icon: "✋",
    color: "from-purple-400 to-pink-400",
  },
  { 
    name: "Recipes", 
    data: recipeVdo,
    icon: "🍳",
    color: "from-orange-400 to-pink-400",
  },
];

const VideoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("Rangoli");

  const currentCategory = categories.find(
    (category) => category.name === selectedCategory
  );
  
  const currentVideos = currentCategory?.data || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -30, 
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-3xl pointer-events-none"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-pink-300/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 mb-4"
            >
              <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                ✨ Women's Wonderland
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-800 mb-4">
              Video <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Categories</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover inspiring tutorials and creative ideas curated just for you
            </p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 w-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto mt-6"
            />
          </motion.div>

          {/* Category Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative px-8 py-4 rounded-2xl font-bold overflow-hidden
                          transition-all duration-300 ${
                            selectedCategory === category.name
                              ? `bg-gradient-to-r ${category.color} text-white shadow-[0_10px_40px_rgba(219,39,119,0.3)]`
                              : "bg-white/80 backdrop-blur-sm text-gray-700 border-2 border-gray-200 hover:border-pink-300"
                          }`}
              >
                {selectedCategory === category.name && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <span className="relative flex items-center gap-2 text-lg">
                  <span className="text-2xl">{category.icon}</span>
                  {category.name}
                </span>

                {selectedCategory === category.name && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-white rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Video Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentVideos.length > 0 ? (
                currentVideos.map((video, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30
                             rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                             hover:shadow-[0_20px_60px_rgba(219,39,119,0.15)]
                             border border-pink-100/50 backdrop-blur-sm
                             transition-all duration-300"
                  >
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-pink-200/40 to-transparent rounded-bl-[80px] pointer-events-none" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
                        <span className={`text-xs font-bold bg-gradient-to-r ${currentCategory.color} bg-clip-text text-transparent`}>
                          {currentCategory.icon} {selectedCategory}
                        </span>
                      </div>
                    </div>

                    {/* Video Container */}
                    <div className="relative aspect-video bg-gradient-to-br from-pink-100/50 to-purple-100/50">
                      <iframe
                        className="w-full h-full"
                        src={video.url}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    {/* Content */}
                    <div className="relative p-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                        {video.title}
                      </h2>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-pink-100/50">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          <span>Watch Tutorial</span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 
                                   flex items-center justify-center text-white shadow-lg
                                   hover:shadow-xl transition-shadow"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </motion.button>
                      </div>

                      {/* Bottom Accent Line */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="col-span-full flex flex-col items-center justify-center py-20"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 
                                flex items-center justify-center mb-6">
                    <svg className="w-16 h-16 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">No videos available for this category.</h3>
                  <p className="text-gray-600">Check back soon for inspiring content!</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-pink-400 rounded-full"
              />
              <span>More tutorials coming soon</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="w-2 h-2 bg-purple-400 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5
          }}
          className="absolute w-2 h-2 bg-pink-400/40 rounded-full blur-sm pointer-events-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + Math.random() * 60}%`
          }}
        />
      ))}
    </div>
  );
};

export default VideoGallery;