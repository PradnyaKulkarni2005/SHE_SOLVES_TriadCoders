import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home", icon: "" },
  { to: "/forum", label: "Fem Forum", icon: "" },
  { to: "/share-business", label: "Women Thrive", icon: "" },
  { to: "/news", label: "Beyond Boundaries", icon: "" },
  { to: "/wonderland", label: "Women's Wonderland", icon: "" },
  { to: "/laws", label: "Fem Guard", icon: "" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const onEsc = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const burgerTop = isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 };
  const burgerMiddle = isOpen ? { opacity: 0 } : { opacity: 1 };
  const burgerBottom = isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`relative flex items-center justify-between h-20 rounded-2xl transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-pink-100/50"
              : "bg-white/80 backdrop-blur-md shadow-lg border border-white/50"
          }`}
        >
          {/* BRAND */}
          <NavLink 
            to="/" 
            aria-label="Her World home" 
            className="flex items-center gap-3 z-20 pl-4 sm:pl-6"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }} 
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3"
            >
              <motion.div 
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(219,39,119,0.3)",
                    "0 0 30px rgba(219,39,119,0.5)",
                    "0 0 20px rgba(219,39,119,0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 
                         flex items-center justify-center text-white relative overflow-hidden"
              >
                {/* Animated shine effect */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />
                
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-7 h-7 relative z-10" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M12 3c1.2 2.8 5 3 7 1s1.6-4.8-1-7c-2.6 2.2-5.4 2.2-7 0-2.6 2.2-5.4 2.2-7 0-2.6 2.2-2.2 6.8 1 7 2 .2 5.8 1 7 3z" />
                </svg>
              </motion.div>

              <div className="flex flex-col leading-tight">
                <span className="text-xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Her World
                </span>
                <span className="text-xs font-semibold text-gray-500">Empower • Voice • Thrive</span>
              </div>
            </motion.div>
          </NavLink>

          {/* CENTER LINKS (desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `group relative px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300
                  ${isActive
                    ? "text-white"
                    : "text-gray-700 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="navActiveBackground"
                        className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    <span className="relative flex items-center gap-2">
                      <span className="text-base">{link.icon}</span>
                      {link.label}
                    </span>

                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ zIndex: -1 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-3 pr-4 sm:pr-6">
            {/* User Avatar */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 
                            flex items-center justify-center text-sm font-black text-white shadow-lg cursor-pointer
                            border-2 border-white">
                HW
              </div>
            </motion.div>

            {/* HAMBURGER (mobile & tablet) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((s) => !s)}
              className="relative z-30 lg:hidden p-3 rounded-xl focus:outline-none bg-gradient-to-r from-pink-100 to-purple-100"
            >
              <span className="sr-only">Toggle menu</span>
              <div className="w-6 h-6 relative">
                <motion.span 
                  animate={burgerTop} 
                  className="block absolute left-0 right-0 h-[3px] bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" 
                />
                <motion.span 
                  animate={burgerMiddle} 
                  className="block absolute left-0 right-0 top-2 h-[3px] bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" 
                />
                <motion.span 
                  animate={burgerBottom} 
                  className="block absolute left-0 right-0 top-4 h-[3px] bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" 
                />
              </div>
            </motion.button>
          </div>

          {/* MOBILE PANEL */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" 
                  onClick={() => setIsOpen(false)}
                />
                
                {/* Sidebar */}
                <motion.aside
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  className="fixed right-0 top-0 bottom-0 w-11/12 max-w-sm 
                           bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50
                           p-6 overflow-auto rounded-l-3xl shadow-2xl z-50 border-l-2 border-pink-200"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <NavLink 
                      to="/" 
                      onClick={() => setIsOpen(false)} 
                      className="flex items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 
                                    flex items-center justify-center text-white shadow-lg">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="w-6 h-6" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <path d="M12 3c1.2 2.8 5 3 7 1s1.6-4.8-1-7c-2.6 2.2-5.4 2.2-7 0-2.6 2.2-5.4 2.2-7 0-2.6 2.2-2.2 6.8 1 7 2 .2 5.8 1 7 3z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-black text-lg bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                          Her World
                        </div>
                        <div className="text-xs font-semibold text-gray-600">Empower • Voice • Thrive</div>
                      </div>
                    </NavLink>

                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsOpen(false)} 
                      aria-label="Close menu" 
                      className="p-2 rounded-xl bg-white/80 text-gray-700 hover:bg-white shadow-md"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex flex-col gap-2">
                    {links.map((link, index) => (
                      <motion.div
                        key={link.to}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <NavLink
                          to={link.to}
                          onClick={() => setIsOpen(false)}
                          end={link.to === "/"}
                          className={({ isActive }) =>
                            `group relative block px-5 py-4 rounded-2xl text-left font-bold transition-all duration-300 overflow-hidden
                             ${isActive 
                               ? "text-white shadow-lg" 
                               : "text-gray-700 hover:text-gray-900 bg-white/60 hover:bg-white/80"}`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              {isActive && (
                                <motion.div
                                  layoutId="mobileActiveBackground"
                                  className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl"
                                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                              )}
                              
                              <span className="relative flex items-center gap-3 text-base">
                                <span className="text-2xl">{link.icon}</span>
                                {link.label}
                              </span>
                            </>
                          )}
                        </NavLink>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Footer CTA */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-100 shadow-lg"
                  >
                    <p className="text-sm font-semibold text-gray-700 mb-4">Stay Connected</p>
                    <div className="flex gap-3">
                      <NavLink 
                        to="/subscribe" 
                        onClick={() => setIsOpen(false)} 
                        className="flex-1 text-center py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 
                                 text-white font-bold shadow-lg hover:shadow-xl transition-shadow"
                      >
                        Subscribe
                      </NavLink>
                      <a 
                        href="/contact" 
                        onClick={() => setIsOpen(false)} 
                        className="px-5 py-3 rounded-xl border-2 border-pink-200 text-gray-700 font-bold
                                 hover:border-pink-300 hover:bg-pink-50 transition-all"
                      >
                        Contact
                      </a>
                    </div>
                  </motion.div>

                  {/* Copyright */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-xs text-center text-gray-500"
                  >
                    © {new Date().getFullYear()} Her World — Empowering women everywhere.
                  </motion.div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </nav>
    </header>
  );
}