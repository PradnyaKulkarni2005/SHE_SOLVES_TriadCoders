import React from "react";
import { motion } from "framer-motion";

export default function NewsCard({ article }) {
  const imageSrc = article?.urlToImage || "";
  const fallbackDataUrl =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fce7f3;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23ddd6fe;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='450' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23db2777' font-size='24' font-weight='600'%3E✨ Image unavailable ✨%3C/text%3E%3C/svg%3E";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        hover: { duration: 0.3 }
      }}
      className="group relative w-full max-w-[340px] bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 
                 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] 
                 hover:shadow-[0_20px_60px_rgb(219,39,119,0.15)]
                 border border-pink-100/50 backdrop-blur-sm
                 transform-gpu will-change-transform transition-all duration-300"
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-200/40 to-transparent rounded-bl-[100px] pointer-events-none" />
      
      {/* Image container with glassmorphic overlay */}
      <div className="relative h-48 md:h-56 w-full overflow-hidden bg-gradient-to-br from-pink-100/50 to-purple-100/50">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src={imageSrc || fallbackDataUrl}
          alt={article?.title || "news image"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackDataUrl;
          }}
          className="w-full h-full object-cover"
        />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating shimmer effect */}
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

      {/* Content section with enhanced spacing */}
      <div className="relative p-5 sm:p-6 space-y-4">
        {/* Title with enhanced typography */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-snug 
                       group-hover:text-pink-600 transition-colors duration-300 line-clamp-2">
          {article?.title || "Untitled"}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3">
          {article?.description || "No description available."}
        </p>

        {/* Footer section */}
        <div className="flex items-center justify-between pt-2 border-t border-pink-100/50">
          {/* Read more button with enhanced design */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            href={article?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read more: ${article?.title || ""}`}
            className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full 
                     text-sm font-bold text-white overflow-hidden
                     bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500
                     shadow-[0_4px_15px_rgba(219,39,119,0.3)] 
                     hover:shadow-[0_6px_25px_rgba(219,39,119,0.4)]
                     transition-all duration-300"
          >
            {/* Animated shine effect */}
            <motion.div
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
            <span className="relative z-10">Read more</span>
            <motion.svg 
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              xmlns="http://www.w3.org/2000/svg" 
              className="relative z-10 w-4 h-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.a>

          {/* Date with icon */}
          <time className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {article?.publishedAt 
              ? new Date(article.publishedAt).toLocaleDateString()
              : ""}
          </time>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.article>
  );
}