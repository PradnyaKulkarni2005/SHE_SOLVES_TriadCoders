const BusinessIdea = require("../models/BusinessIdea");

// Upload a new business idea
exports.addBusinessIdea = async (req, res) => {
    try {
        const { businessName, description, contactDetails } = req.body;
        const poster = req.file ? req.file.path : ""; // Image path
        
        const newIdea = new BusinessIdea({
            businessName,
            description,
            contactDetails,
            poster
        });

        await newIdea.save();
        res.status(201).json({ message: "Business Idea Shared Successfully", newIdea });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all business ideas
exports.getAllBusinessIdeas = async (req, res) => {
    try {
        const ideas = await BusinessIdea.find().sort({ createdAt: -1 });
        res.status(200).json(ideas);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch business ideas" });
    }
};
