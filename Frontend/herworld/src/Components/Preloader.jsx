import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import preloaderVideo from "../assets/preloader.mp4";

const Preloader = ({ onComplete }) => {
  const videoRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);

  const empoweringPhrases = [
    "Empowering Voices",
    "Building Community",
    "Inspiring Change",
    "Breaking Barriers",
    "Celebrating Women"
  ];

  useEffect(() => {
    // Ensure video plays automatically
    if (videoRef.current) {
      videoRef.current.play().catch((error) => console.error("Video playback failed:", error));
    }

    // Rotate through empowering phrases
    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % empoweringPhrases.length);
    }, 2000);

    return () => clearInterval(phraseInterval);
  }, []);

  const handleVideoEnd = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] bg-black"
        >
          {/* Full-screen video background */}
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              onEnded={handleVideoEnd}
              playsInline
              autoPlay
              muted
            >
              <source src={preloaderVideo} type="video/mp4" />
            </video>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex flex-col items-center justify-between p-8 sm:p-12">
            {/* Top: Logo */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="pt-8"
            >
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="relative"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 
                              flex items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.6)]">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-12 h-12 text-white" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M12 3c1.2 2.8 5 3 7 1s1.6-4.8-1-7c-2.6 2.2-5.4 2.2-7 0-2.6 2.2-5.4 2.2-7 0-2.6 2.2-2.2 6.8 1 7 2 .2 5.8 1 7 3z" />
                  </svg>
                </div>
                
                {/* Orbiting particles */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transformOrigin: 'center' }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 blur-sm"
                      style={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) translateY(-${60 + i * 10}px)`
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Center: Animated Text */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-8 max-w-2xl">
                <motion.h1
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-5xl sm:text-7xl lg:text-8xl font-black"
                >
                
                </motion.h1>

                {/* Rotating phrases */}
               

                {/* Animated line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-1 w-64 mx-auto bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full"
                />

                {/* Pulsing dots */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-center gap-3 pt-4"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 1, 0.4]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      className="w-3 h-3 rounded-full bg-white"
                    />
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Bottom: Skip button & floating elements */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="pb-8 text-center space-y-4"
            >
              <p className="text-white/60 text-sm font-medium tracking-wide">
                Loading your experience...
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVideoEnd}
                className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20
                         text-white font-semibold hover:bg-white/20 transition-all duration-300
                         shadow-lg hover:shadow-xl"
              >
                Skip Intro
              </motion.button>
            </motion.div>
          </div>

          {/* Animated corner decorations */}
          {[
            { corner: "top-left", initial: { x: -100, y: -100 } },
            { corner: "top-right", initial: { x: 100, y: -100 } },
            { corner: "bottom-left", initial: { x: -100, y: 100 } },
            { corner: "bottom-right", initial: { x: 100, y: 100 } }
          ].map((item, i) => (
            <motion.div
              key={item.corner}
              initial={item.initial}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
              className={`absolute w-32 h-32 pointer-events-none ${
                item.corner === "top-left" ? "top-0 left-0" :
                item.corner === "top-right" ? "top-0 right-0" :
                item.corner === "bottom-left" ? "bottom-0 left-0" :
                "bottom-0 right-0"
              }`}
            >
              <svg className="w-full h-full opacity-30" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, rotate: 0 }}
                  animate={{ pathLength: 1, rotate: 360 }}
                  transition={{ 
                    pathLength: { duration: 2, delay: 0.5 + i * 0.1 },
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          ))}

          {/* Sparkle effects */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0l2.5 7.5L22 10l-7.5 2.5L12 20l-2.5-7.5L2 10l7.5-2.5L12 0z" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;