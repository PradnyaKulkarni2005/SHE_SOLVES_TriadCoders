import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchNews } from "../api";
import NewsCard from "./NewsCard";

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNews = async () => {
            try {
                setLoading(true);
                const data = await fetchNews();
                if (data.error) {
                    setError(data.error);
                } else {
                    setNews(data.articles || []);
                }
            } catch (err) {
                setError("Failed to fetch news");
                console.error("Error fetching news:", err);
            } finally {
                setLoading(false);
            }
        };

        getNews();
    }, []);

    // Loading State
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full"
                />
                <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-gray-600 font-medium"
                >
                    Loading inspiring stories...
                </motion.p>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto my-20"
            >
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-red-100 shadow-lg text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                    >
                        Try Again
                    </button>
                </div>
            </motion.div>
        );
    }

    // No News State
    if (news.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto my-20 text-center"
            >
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-12 border border-purple-100 shadow-lg">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No News Available</h3>
                    <p className="text-gray-600">Check back soon for inspiring stories and updates!</p>
                </div>
            </motion.div>
        );
    }

    // News Grid
    return (
        <div className="w-full">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
                    Latest <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Stories</span>
                </h2>
                <p className="text-gray-600 text-lg">
                    Discover {news.length} inspiring article{news.length !== 1 ? 's' : ''} curated for you
                </p>
                <motion.div
                    animate={{ scaleX: [0, 1] }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto mt-4"
                />
            </motion.div>

            {/* News Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center"
                >
                    {news.map((article, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.1,
                                ease: "easeOut"
                            }}
                        >
                            <NewsCard article={article} />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Load More Section (Optional - can be enabled later) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center mt-16"
            >
                <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-pink-400 rounded-full"
                    />
                    <span>More stories coming soon</span>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        className="w-2 h-2 bg-purple-400 rounded-full"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default NewsList;