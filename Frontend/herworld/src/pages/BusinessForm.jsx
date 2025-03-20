import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BusinessForm.css"; // Import the CSS file

// ✅ Dynamically Set API URL Based on Environment
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/businessIdeas" // Local development
    : "https://she-solves-triad-coders.vercel.app/api/businessIdeas"; // Hosted backend (Replace with actual link)

const BusinessForm = () => {
    const [businessName, setBusinessName] = useState("");
    const [description, setDescription] = useState("");
    const [contactDetails, setContactDetails] = useState("");
    const [poster, setPoster] = useState(null);
    const [businessIdeas, setBusinessIdeas] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("businessName", businessName);
        formData.append("description", description);
        formData.append("contactDetails", contactDetails);
        if (poster) formData.append("poster", poster);

        console.log("FormData:", { businessName, description, contactDetails, poster });

        try {
            const response = await axios.post(`${API_BASE_URL}/add`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Server Response:", response.data);
            alert("Business Idea Shared Successfully!");
            setBusinessName("");
            setDescription("");
            setContactDetails("");
            setPoster(null);
            fetchBusinessIdeas(); // Fetch the updated list of business ideas
        } catch (error) {
            console.error("Error submitting form", error);
            if (error.response) {
                console.error("Server responded with:", error.response.data);
            }
        }
    };

    const fetchBusinessIdeas = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/all`);
            setBusinessIdeas(response.data);
        } catch (error) {
            console.error("Error fetching business ideas", error);
        }
    };

    useEffect(() => {
        fetchBusinessIdeas();
    }, []);

    return (
        <div className="business-form-container">
            <h2 className="form-title">Share Your Business Idea</h2>
            <form onSubmit={handleSubmit} className="business-form">
                <input
                    type="text"
                    placeholder="Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    className="form-input"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="form-textarea"
                ></textarea>
                <input
                    type="text"
                    placeholder="Contact Details"
                    value={contactDetails}
                    onChange={(e) => setContactDetails(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="file"
                    id="poster" // Add an ID for the label
                    accept="image/*"
                    onChange={(e) => setPoster(e.target.files[0])}
                    className="form-file-input"
                    style={{ display: "none" }} // Hide the default file input
                />
                <label htmlFor="poster" className="file-input-label">
                    Upload Flyer/Poster (Image)
                </label>
                <button type="submit" className="form-button" style={{ width: "14%", height: "35px", color: "white", backgroundColor: "black", fontSize: "15px", padding: "5px" }}>
                    Share Idea
                </button>
            </form>

            <h2 className="ideas-title">Business Ideas</h2>
            <div className="business-ideas-container">
                {businessIdeas.length === 0 ? (
                    <p className="no-ideas">No business ideas shared yet.</p>
                ) : (
                    businessIdeas.map((idea) => (
                        <div key={idea._id} className="business-idea-card">
                            <h3 className="idea-title">{idea.businessName}</h3>
                            <p className="idea-description">{idea.description}</p>
                            <p className="idea-contact">Contact: {idea.contactDetails}</p>
                            {idea.poster && (
                                <img
                                    src={`${API_BASE_URL.replace("/api/businessIdeas", "")}/uploads/${idea.poster}`}
                                    alt="Poster"
                                    className="idea-poster"
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BusinessForm;
