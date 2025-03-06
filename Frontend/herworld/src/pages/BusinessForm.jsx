import React, { useState } from "react";
import axios from "axios";

const BusinessForm = () => {
    const [businessName, setBusinessName] = useState("");
    const [description, setDescription] = useState("");
    const [contactDetails, setContactDetails] = useState("");
    const [poster, setPoster] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("businessName", businessName);
        formData.append("description", description);
        formData.append("contactDetails", contactDetails);
        if (poster) formData.append("poster", poster);

        try {
            await axios.post("http://localhost:5000/business-ideas/add", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("Business Idea Shared Successfully!");
            setBusinessName("");
            setDescription("");
            setContactDetails("");
            setPoster(null);
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    return (
        <div>
            <h2>Share Your Business Idea</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <input type="text" placeholder="Contact Details" value={contactDetails} onChange={(e) => setContactDetails(e.target.value)} required />
                <input type="file" accept="image/*" onChange={(e) => setPoster(e.target.files[0])} />
                <button type="submit">Share Idea</button>
            </form>
        </div>
    );
};

export default BusinessForm;
