import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import boundaries from "../assets/boundaries.jpg";
import forum from "../assets/forum.jpg";
import thrive from "../assets/womenthrive.jpg";
import wonderland from "../assets/wonderland.jpg";
import laws from "../assets/laws.jpg";
import ai from "../assets/ai.jpg";


const features = [
  {
    title: "Fem Forum",
    description: "Your Voice, Your Power!",
    path: "/forum",
    image: forum,
    color: "from-pink-400 to-rose-400",
    icon: "💬"
  },
  {
    title: "Women Thrive",
    description: "Empower, Elevate, Excel!",
    path: "/share-business",
    image: thrive,
    color: "from-purple-400 to-pink-400",
    icon: "🚀"
  },
  {
    title: "Beyond Boundaries",
    description: "Stay Informed, Stay Ahead!",
    path: "/news",
    image: boundaries,
    color: "from-blue-400 to-purple-400",
    icon: "📰"
  },
  {
    title: "Women's Wonderland",
    description: "Explore, Create, Inspire!",
    path: "/wonderland",
    image: wonderland,
    color: "from-pink-400 to-purple-400",
    icon: "✨"
  },
  {
    title: "Fem Guard",
    description: "Know your rights!",
    path: "/laws",
    image: laws,
    color: "from-indigo-400 to-pink-400",
    icon: "⚖️"
  },
  {
  title: "Her AI Guide",
  description: "Career, Mental Health, Business & Legal Support",
  path: "/ai-assistant",
  image: ai,
  color: "from-emerald-400 to-cyan-400",
  icon: "🤖"
},

];

export default function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = () => navigate("/signup");
  const handleFeatureClick = (path) => navigate(path);

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i = 1) => ({ 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" } 
    }),
    hover: { 
      y: -12, 
      scale: 1.03,
      transition: { duration: 0.3, ease: "easeOut" } 
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-3xl pointer-events-none"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/20 to-pink-200/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* HERO SECTION */}
      <header className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Content */}
            <div className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 shadow-sm"
              >
                <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Community • Safety • Growth
                </span>
              </motion.div>

              {/* Main Title */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight"
                >
                  <span className="block text-gray-800">EMPOWER</span>
                  <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    PROTECT
                  </span>
                  <span className="block text-gray-800">TRANSFORM</span>
                </motion.h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="h-2 w-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mt-4"
                />
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl"
              >
                A safe, supportive platform for women to{" "}
                <span className="font-semibold text-pink-600">share experiences</span>,{" "}
                <span className="font-semibold text-purple-600">explore business ideas</span>,
                and stay connected to the latest news and rights guidance.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignupClick}
                  className="group relative px-8 py-4 rounded-2xl font-bold text-white overflow-hidden
                           bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                           shadow-[0_10px_40px_rgba(219,39,119,0.3)] hover:shadow-[0_15px_50px_rgba(219,39,119,0.4)]
                           transition-all duration-300"
                >
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    Get Started
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLoginClick}
                  className="px-8 py-4 rounded-2xl font-semibold text-gray-700
                           bg-white/80 backdrop-blur-sm border-2 border-gray-200
                           hover:border-pink-300 hover:bg-white shadow-lg
                           transition-all duration-300"
                >
                  Sign in
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-8 pt-4"
              >
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    10k+
                  </div>
                  <div className="text-sm text-gray-600">Active Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    50k+
                  </div>
                  <div className="text-sm text-gray-600">Stories Shared</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className="text-sm text-gray-600">Safe Space</div>
                </div>
              </motion.div>
            </div>

            {/* Right: Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.15)] group">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={wonderland}
                  alt="Women's Wonderland preview"
                  className="w-full h-96 lg:h-[500px] object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='700'%3E%3Crect width='1200' height='700' fill='%23fff1f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23e37aa6' font-size='28'%3EImage unavailable%3C/text%3E%3C/svg%3E";
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Featured Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute top-6 left-6"
                >
                  <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
                    <span className="text-sm font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                      ✨ Featured
                    </span>
                  </div>
                </motion.div>

                {/* Explore Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFeatureClick("/wonderland")}
                  className="absolute bottom-6 right-6 px-6 py-3 rounded-2xl
                           bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold
                           shadow-[0_10px_30px_rgba(219,39,119,0.4)]
                           hover:shadow-[0_15px_40px_rgba(219,39,119,0.5)]
                           transition-all duration-300"
                >
                  Explore Now
                </motion.button>
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-2xl opacity-60"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-300 to-pink-300 rounded-full blur-2xl opacity-60"
              />
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 mb-4"
            >
              <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Discover Our Platform
              </span>
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl font-black text-gray-800 mb-4">
              Explore the <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Community</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Five powerful features designed to support, empower, and inspire women everywhere
            </p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-1 w-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto mt-6"
            />
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.article
                key={feature.title}
                className="group relative rounded-3xl overflow-hidden cursor-pointer
                         bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30
                         border border-pink-100/50 backdrop-blur-sm
                         shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                         hover:shadow-[0_20px_60px_rgba(219,39,119,0.15)]
                         transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover="hover"
                onClick={() => handleFeatureClick(feature.path)}
              >
                {/* Icon Badge */}
                <div className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm
                              flex items-center justify-center text-2xl shadow-lg
                              group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={feature.image}
                    alt={feature.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='800' height='450' fill='%23fff1f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23e37aa6' font-size='20'%3EImage unavailable%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Shimmer Effect */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                      repeatDelay: 5
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                </div>

                {/* Content */}
                <div className="relative p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFeatureClick(feature.path);
                    }}
                    className={`relative w-full px-6 py-3 rounded-xl font-bold text-white overflow-hidden
                              bg-gradient-to-r ${feature.color}
                              shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <motion.div
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      Explore
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </motion.button>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.6
          }}
          className="absolute w-3 h-3 bg-pink-400/30 rounded-full blur-sm pointer-events-none"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + Math.random() * 60}%`
          }}
        />
      ))}
    </div>
  );
}