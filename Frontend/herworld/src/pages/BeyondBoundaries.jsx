import React from 'react';
import { motion } from 'framer-motion';
import NewsList from '../Components/NewsList';

const BeyondBoundaries = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-blue-50/20 relative overflow-hidden">
            {/* Animated background blobs */}
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

            {/* Header Section */}
            <div className="relative z-10 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center space-y-6">
                    {/* Decorative top element */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center justify-center gap-3 mb-4"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent"
                        />
                        <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">
                            ✨ Beyond Boundaries
                        </span>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent"
                        />
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold"
                    >
                        <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Women's News
                        </span>
                        <br />
                        <span className="text-gray-800">& Updates</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                    >
                        Stay informed with the latest stories, achievements, and insights
                        <span className="text-pink-500 font-semibold"> empowering women worldwide</span>
                    </motion.p>

                    {/* Decorative dots */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex items-center justify-center gap-2 pt-4"
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.3
                                }}
                                className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
                            />
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* News List Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    {/* Optional: Add a decorative card wrapper */}
                    <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-white/60">
                        <NewsList />
                    </div>
                </div>
            </motion.div>

            {/* Floating particles effect */}
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

export default BeyondBoundaries;