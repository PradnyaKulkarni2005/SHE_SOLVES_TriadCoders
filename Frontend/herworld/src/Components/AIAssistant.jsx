import { useState } from "react";
import axios from "axios";

/**
 * API Base URL
 * - Local: http://localhost:5000/api
 * - Production: https://she-solves-triad-coders.vercel.app/api
 */
const API_BASE_URL =
  import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "https://she-solves-triad-coders.vercel.app/api";

export default function AIAssistant() {
  const [category, setCategory] = useState("career");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: "career", label: "Career Advice", icon: "💼", color: "from-purple-400 to-pink-400" },
    { value: "mental", label: "Mental Health", icon: "🌸", color: "from-rose-400 to-orange-400" },
    { value: "business", label: "Business Ideas", icon: "💡", color: "from-amber-400 to-yellow-400" },
    { value: "legal", label: "Legal Rights", icon: "⚖️", color: "from-teal-400 to-cyan-400" },
  ];

  const selectedCategory = categories.find((c) => c.value === category);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    setReply("");

    try {
      const res = await axios.post(`${API_BASE_URL}/ai/chat`, {
        message,
        category,
        country,
      });

      setReply(res.data.reply);
    } catch (error) {
      console.error("AI Error:", error);
      setReply("Sorry, something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-3">
            HerWorld AI
          </h1>
          <p className="text-gray-600 text-lg">
            Your personal companion for growth and empowerment
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Category Selection */}
          <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Choose Your Topic
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    category === cat.value
                      ? `bg-gradient-to-br ${cat.color} text-white shadow-lg scale-105`
                      : "bg-white text-gray-700 hover:shadow-md"
                  }`}
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="text-sm font-semibold">{cat.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Input Section */}
          <div className="p-6 md:p-8">
            {category === "legal" && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Country
                </label>
                <input
                  type="text"
                  placeholder="e.g., India, USA, UK"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400"
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Question
              </label>
              <textarea
                placeholder="Share your thoughts, questions, or concerns..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="6"
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 resize-none"
              />
            </div>

            <button
              onClick={sendMessage}
              disabled={isLoading || !message.trim()}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                isLoading || !message.trim()
                  ? "bg-gray-300 cursor-not-allowed"
                  : `bg-gradient-to-r ${selectedCategory.color} hover:shadow-lg`
              }`}
            >
              {isLoading ? "Thinking..." : `Get Guidance ${selectedCategory.icon}`}
            </button>
          </div>

          {/* Response Section */}
          {reply && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 md:p-8 border-t-2 border-purple-100">
              <div className="flex items-start space-x-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedCategory.color} flex items-center justify-center text-white font-bold`}
                >
                  AI
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Your Personalized Guidance
                  </h3>
                  <div className="bg-white rounded-2xl p-5 shadow-md">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {reply}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Empowering women, one conversation at a time 💜</p>
        </div>
      </div>
    </div>
  );
}
