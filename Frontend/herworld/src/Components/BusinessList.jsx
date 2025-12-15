import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, Mail, Briefcase, TrendingUp, Filter, Star } from "lucide-react";

const cardContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.5 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

export default function BusinessList() {
  const [ideas, setIdeas] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let mounted = true;

    const fetchIdeas = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/businessIdeas/all`
        );
        const data = await response.json();

        if (mounted) {
          setIdeas(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Error fetching business ideas", err);
        if (mounted)
          setError("Unable to load business ideas. Please try again later.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchIdeas();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = ideas;
    
    if (q) {
      result = result.filter((idea) => {
        const name = (idea.businessName || "").toLowerCase();
        const desc = (idea.description || "").toLowerCase();
        const contact = (idea.contactDetails || "").toLowerCase();
        return name.includes(q) || desc.includes(q) || contact.includes(q);
      });
    }
    
    return result;
  }, [ideas, query]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 rounded-3xl mb-6 shadow-xl"
          >
            <Briefcase className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent"
          >
            Business Ideas Marketplace
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover innovative business ideas, connect with entrepreneurs, and turn vision into reality
          </motion.p>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-violet-100">
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp className="w-5 h-5 text-violet-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{ideas.length}</p>
                <p className="text-xs text-gray-600">Ideas</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100">
            <div className="flex items-center justify-center space-x-2">
              <Briefcase className="w-5 h-5 text-pink-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
                <p className="text-xs text-gray-600">Showing</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-blue-100">
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <p className="text-xs text-gray-600">Rating</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, description, or contact..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 text-gray-900 placeholder:text-gray-400 border-2 border-transparent focus:border-violet-500 focus:bg-white focus:outline-none transition-all text-lg"
              />
            </div>
            <button className="lg:w-auto flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-gray-200">
                  <div className="h-56 w-full rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 mb-4" />
                  <div className="h-6 w-3/4 bg-gray-200 rounded-lg mb-3" />
                  <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded mb-4" />
                  <div className="h-10 w-full bg-gray-200 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <p className="text-red-700 font-semibold text-lg">{error}</p>
          </motion.div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl border border-gray-200"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-violet-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No ideas found</h3>
            <p className="text-gray-600 mb-6">Be the first to share your innovative business idea!</p>
            <a
              href="/share-business"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <span>Share Your Idea</span>
            </a>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={cardContainer}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((idea, index) => {
                const poster = idea.poster ? `http://localhost:5000/${idea.poster}` : null;
                return (
                  <motion.article
                    key={idea._id || `${idea.businessName}-${index}`}
                    className="group bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:border-violet-300 transition-all"
                    variants={cardItem}
                    layout
                    whileHover={{ y: -8 }}
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-violet-100 to-pink-100">
                      {poster ? (
                        <img
                          src={poster}
                          alt={idea.businessName || "Business poster"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23f3e8ff'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239333ea' font-size='28'%3EImage unavailable%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Briefcase className="w-16 h-16 text-violet-300" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-violet-600 shadow-lg">
                        New
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-violet-600 transition-colors">
                        {idea.businessName || "Untitled Idea"}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                        {idea.description || "No description provided."}
                      </p>

                      {/* Contact */}
                      <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 rounded-xl">
                        <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <a
                          href={`mailto:${idea.contactDetails || ""}`}
                          className="text-sm text-gray-700 hover:text-violet-600 transition-colors truncate font-medium"
                        >
                          {idea.contactDetails || "No contact"}
                        </a>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <a
                          href={poster || "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all group/btn"
                        >
                          <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          <span>View Details</span>
                        </a>
                        <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                          <Star className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}