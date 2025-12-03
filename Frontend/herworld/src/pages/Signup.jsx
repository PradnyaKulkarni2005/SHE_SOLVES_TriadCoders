// src/pages/Signup.jsx
import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState(null); // { type: 'success'|'error', text }
  const navigate = useNavigate();

  const showFlash = (type, text) => {
    setFlash({ type, text });
    setTimeout(() => setFlash(null), 4500);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      showFlash("error", "Please fill all fields.");
      return;
    }
    // simple email check
    if (!/\S+@\S+\.\S+/.test(email)) {
      showFlash("error", "Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const data = await registerUser({ name: name.trim(), email: email.trim(), password });
      // backend expected behaviour preserved
      if (data?.message) {
        showFlash("success", "Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1300);
      } else {
        showFlash("error", data?.error || "Signup failed. Try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      showFlash("error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-md bg-white/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_14px_40px_rgba(16,24,40,0.06)] border border-white/30"
      >
        <header className="mb-4 text-center">
          <h1 className="text-2xl font-extrabold text-[rgba(50,35,70,0.95)]">Create your account</h1>
          <p className="mt-1 text-sm text-[rgba(50,35,70,0.6)]">
            Join Her World — connect, learn, and grow with other women.
          </p>
        </header>

        <form onSubmit={handleSignup} className="space-y-4">
          <label className="block">
            <span className="text-sm text-[rgba(50,35,70,0.75)]">Full name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
              className="mt-2 w-full px-4 py-2 rounded-xl bg-white text-[rgba(30,18,46,0.9)] placeholder:text-[rgba(30,18,46,0.38)] border border-[rgba(30,18,46,0.04)] focus:outline-none focus:ring-2 focus:ring-[rgba(227,58,154,0.14)]"
            />
          </label>

          <label className="block">
            <span className="text-sm text-[rgba(50,35,70,0.75)]">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              required
              className="mt-2 w-full px-4 py-2 rounded-xl bg-white text-[rgba(30,18,46,0.9)] placeholder:text-[rgba(30,18,46,0.38)] border border-[rgba(30,18,46,0.04)] focus:outline-none focus:ring-2 focus:ring-[rgba(227,58,154,0.14)]"
            />
          </label>

          <label className="block relative">
            <span className="text-sm text-[rgba(50,35,70,0.75)]">Password</span>
            <div className="mt-2 flex items-center gap-2">
              <input
                type={visible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a secure password"
                required
                minLength={6}
                className="flex-1 px-4 py-2 rounded-xl bg-white text-[rgba(30,18,46,0.9)] placeholder:text-[rgba(30,18,46,0.38)] border border-[rgba(30,18,46,0.04)] focus:outline-none focus:ring-2 focus:ring-[rgba(227,58,154,0.14)]"
              />
              <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                aria-label={visible ? "Hide password" : "Show password"}
                className="px-3 py-2 rounded-lg bg-[rgba(50,35,70,0.06)] text-[rgba(50,35,70,0.7)] hover:bg-[rgba(50,35,70,0.08)] transition"
              >
                {visible ? "Hide" : "Show"}
              </button>
            </div>
            <p className="mt-1 text-xs text-[rgba(50,35,70,0.5)]">At least 6 characters</p>
          </label>

          <div className="pt-2">
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-pink-400 via-brand-500 to-indigoAccent-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.6)" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                  Creating...
                </>
              ) : (
                "Create account"
              )}
            </motion.button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-[rgba(50,35,70,0.65)]">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold text-[rgba(227,58,154,0.95)] hover:underline"
          >
            Sign in
          </button>
        </div>

        {/* inline flash */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={flash ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.25 }}
          className={`mt-5 px-4 py-3 rounded-lg text-sm ${flash ? (flash.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700") : "pointer-events-none"}`}
        >
          {flash?.text}
        </motion.div>
      </motion.div>
    </div>
  );
}
