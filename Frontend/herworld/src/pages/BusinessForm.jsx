import React, { useState, useEffect } from "react";
import { Upload, Briefcase, Send, Mail, FileText, Image, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/businessIdeas"
    : "https://she-solves-triad-coders.vercel.app/api/businessIdeas";

const BusinessForm = () => {
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [poster, setPoster] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [businessIdeas, setBusinessIdeas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPoster(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("businessName", businessName);
    formData.append("description", description);
    formData.append("contactDetails", contactDetails);
    if (poster) formData.append("poster", poster);

    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to submit");

      setShowSuccess(true);
      setBusinessName("");
      setDescription("");
      setContactDetails("");
      setPoster(null);
      setPosterPreview(null);
      fetchBusinessIdeas();

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form", error);
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchBusinessIdeas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/all`);
      const data = await response.json();
      setBusinessIdeas(data);
    } catch (error) {
      console.error("Error fetching business ideas", error);
    }
  };

  useEffect(() => {
    fetchBusinessIdeas();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl mb-6 shadow-2xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Share Your Vision
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your innovative ideas into reality. Share your business concept with our community.
          </p>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div className="max-w-3xl mx-auto mb-8 bg-green-50 border-2 border-green-200 rounded-2xl p-6 flex items-center space-x-4 shadow-lg animate-pulse">
            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-green-900 text-lg">Success!</h3>
              <p className="text-green-700">Your business idea has been shared successfully.</p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8 bg-red-50 border-2 border-red-200 rounded-2xl p-6 flex items-center space-x-4 shadow-lg">
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-red-900 text-lg">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Form Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                <Briefcase className="w-7 h-7" />
                <span>Submit Your Business Idea</span>
              </h2>
            </div>

            <div className="p-8 space-y-6">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Name *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your business name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    placeholder="Describe your business idea in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="5"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 resize-none"
                  ></textarea>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {description.length}/500 characters
                </p>
              </div>

              {/* Contact Details */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Details *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Email or phone number"
                    value={contactDetails}
                    onChange={(e) => setContactDetails(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Flyer/Poster (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="poster"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="poster"
                    className="flex items-center justify-center w-full px-6 py-8 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all group"
                  >
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-400 group-hover:text-purple-600 mx-auto mb-3 transition-colors" />
                      <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">
                        Click to upload image
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </label>
                </div>

                {/* Image Preview */}
                {posterPreview && (
                  <div className="mt-4 relative">
                    <img
                      src={posterPreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPoster(null);
                        setPosterPreview(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !businessName || !description || !contactDetails}
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-3 group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    <span>Share Your Idea</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Ideas List Section */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Community Ideas
            </h2>
            <p className="text-gray-600">
              Explore innovative business concepts shared by our community
            </p>
          </div>

          {businessIdeas.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No ideas yet
              </h3>
              <p className="text-gray-600">
                Be the first to share your innovative business idea!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessIdeas.map((idea) => (
                <div
                  key={idea._id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl hover:border-purple-300 transition-all group"
                >
                  {idea.poster && (
                    <div className="h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-pink-100">
                      <img
                        src={`${API_BASE_URL.replace("/api/businessIdeas", "")}/uploads/${idea.poster}`}
                        alt={idea.businessName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {idea.businessName}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {idea.description}
                    </p>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl">
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-medium truncate">
                        {idea.contactDetails}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessForm;