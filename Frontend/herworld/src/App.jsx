// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import "./index.css"; // <-- tailwind directives + brand helpers

import Home from "./pages/Home";
import Forum from "./pages/Forum";
import Navbar from "./Components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BeyondBoundaries from "./pages/BeyondBoundaries";
import VideoGallery from "./pages/VideoGallery";
import BusinessForm from "./pages/BusinessForm";
import BusinessList from "./Components/BusinessList";
import Preloader from "./Components/Preloader.jsx";
import LawsList from "./pages/LawList.jsx";

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center p-6 bg-white/40 rounded-2xl shadow-lg border border-white/30">
        <h2 className="text-3xl font-semibold text-[rgba(50,35,70,0.95)] mb-2">404 — Page not found</h2>
        <p className="text-sm text-[rgba(50,35,70,0.6)]">
          The page you were looking for doesn't exist. Try the home page.
        </p>
      </div>
    </div>
  );
}

function App() {
  const [showContent, setShowContent] = useState(false);

  // simple motion variants for page transitions
  const pageVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <Router>
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:bg-white/20 focus:text-[rgba(50,35,70,0.95)] focus:px-4 focus:py-2 rounded-md z-50"
      >
        Skip to content
      </a>

      {!showContent ? (
        <Preloader onComplete={() => setShowContent(true)} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-lavender-100 text-[rgba(50,35,70,0.95)] selection:bg-pink-200 selection:text-[rgba(50,35,70,0.95)]">
          {/* Navbar is fixed in the Navbar component; ensure main has top padding so content isn't hidden */}
          <Navbar />

          {/* Content container — pt-20 keeps content below fixed navbar (adjust if your navbar height changes) */}
          <motion.main
            id="main-content"
            className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 container mx-auto max-w-7xl"
            initial="hidden"
            animate="visible"
            variants={pageVariants}
          >
            {/* Main wrapper: softer glass card for pastel theme */}
            <div className="rounded-2xl bg-white/40 backdrop-blur-md p-6 md:p-8 shadow-[0_14px_40px_rgba(16,24,40,0.06)] border border-white/30 animate-pop-in">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/news" element={<BeyondBoundaries />} />
                <Route path="/wonderland" element={<VideoGallery />} />
                <Route path="/share-business" element={<BusinessForm />} />
                <Route path="/business-ideas" element={<BusinessList />} />
                <Route path="/laws" element={<LawsList />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </motion.main>

          <footer className="mt-10 pb-8 text-center text-sm">
            <div className="container mx-auto max-w-7xl px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[rgba(50,35,70,0.72)]">
                  © {new Date().getFullYear()} <span className="font-semibold text-[rgba(50,35,70,0.9)]">Her World</span> — Empowering women everywhere.
                </div>
                <div className="flex items-center gap-3">
                  <a className="text-sm text-[rgba(50,35,70,0.72)] hover:underline" href="/privacy">Privacy</a>
                  <span className="hidden md:inline-block text-[rgba(50,35,70,0.48)]">•</span>
                  <a className="text-sm text-[rgba(50,35,70,0.72)] hover:underline" href="/terms">Terms</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </Router>
  );
}

export default App;
