import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import lawsData from '../data/Laws.json';

const LawsList = () => {
  const [laws, setLaws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLaws(lawsData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredLaws = laws.filter(law => 
    law.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    law.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto border-4 border-pink-200 border-t-pink-500 rounded-full"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-xl text-gray-600 font-semibold"
          >
            Loading your rights...
          </motion.p>
        </div>
      </div>
    );
  }

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
              className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-pink-100 mb-4"
            >
              <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                ⚖️ Fem Guard
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-800 mb-4">
              Know Your <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Rights</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Essential legal protections and rights every woman should know
            </p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 w-32 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full mx-auto mb-8"
            />

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search laws and rights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-2xl bg-white/80 backdrop-blur-sm
                           border-2 border-pink-100 focus:border-pink-300 focus:outline-none
                           text-gray-800 placeholder-gray-400 font-medium shadow-lg
                           transition-all duration-300"
                />
                <svg
                  className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-pink-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setSearchQuery('')}
                    className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                             bg-pink-100 hover:bg-pink-200 flex items-center justify-center
                             text-pink-600 transition-colors"
                  >
                    ✕
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Laws Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-6 text-center"
          >
            <span className="text-gray-600 font-medium">
              {filteredLaws.length} {filteredLaws.length === 1 ? 'law' : 'laws'} found
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredLaws.length > 0 ? (
                filteredLaws.map((law, index) => (
                  <motion.div
                    key={law.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1,
                      layout: { duration: 0.3 }
                    }}
                    whileHover={{ y: -8 }}
                    className="group relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30
                             rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                             hover:shadow-[0_20px_60px_rgba(219,39,119,0.15)]
                             border border-pink-100/50 backdrop-blur-sm
                             transition-all duration-300"
                  >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-200/40 to-transparent rounded-bl-[100px] pointer-events-none" />
                    
                    {/* Law Number Badge */}
                    <div className="absolute top-6 left-6 z-10">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-pink-400 
                                    flex items-center justify-center text-white font-black text-lg shadow-lg">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="relative p-8 pt-24">
                      <h2 className="text-2xl font-black text-gray-800 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                        {law.title}
                      </h2>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {law.description}
                      </p>

                      {/* Expandable Section */}
                      <motion.div
                        animate={{ height: expandedCard === law.id ? 'auto' : 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t-2 border-pink-100">
                          <div className="bg-gradient-to-r from-indigo-50 to-pink-50 rounded-2xl p-5">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-pink-400 
                                            flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-800 mb-2">Detailed Explanation</h3>
                                <p className="text-gray-700 leading-relaxed">
                                  {law.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Read More Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setExpandedCard(expandedCard === law.id ? null : law.id)}
                        className="mt-6 w-full px-6 py-3 rounded-xl font-bold text-white overflow-hidden
                                 bg-gradient-to-r from-indigo-500 to-pink-500
                                 shadow-lg hover:shadow-xl transition-all duration-300 relative group/btn"
                      >
                        <motion.div
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                        <span className="relative flex items-center justify-center gap-2">
                          {expandedCard === law.id ? (
                            <>
                              Show Less
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                              </svg>
                            </>
                          ) : (
                            <>
                              Read More
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </>
                          )}
                        </span>
                      </motion.button>

                      {/* Bottom Accent Line */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">No Laws Found</h3>
                  <p className="text-gray-600">Try adjusting your search query</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-indigo-400 rounded-full"
              />
              <span>Stay informed, stay empowered</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="w-2 h-2 bg-pink-400 rounded-full"
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
          className="absolute w-2 h-2 bg-indigo-400/40 rounded-full blur-sm pointer-events-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + Math.random() * 60}%`
          }}
        />
      ))}
    </div>
  );
};

export default LawsList;