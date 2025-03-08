const BusinessIdea = require("../models/BusinessIdea");

// Upload a new business idea
exports.addBusinessIdea = async (req, res) => {
    try {
        const { businessName, description, contactDetails } = req.body;
        console.log('Received business idea:', { businessName, description, contactDetails });
        const poster = req.file ? req.file.path : ""; // Image path 
        console.log('Poster path:', poster);
        
        const newIdea = new BusinessIdea({
            businessName,
            description,
            contactDetails,
            poster
        });

        await newIdea.save();
        console.log('Business idea saved:', newIdea);
        res.status(201).json({ message: "Business Idea Shared Successfully", newIdea });
    } catch (error) {
        console.error('Error saving business idea:', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all business ideas
exports.getAllBusinessIdeas = async (req, res) => {
    try {
        const ideas = await BusinessIdea.find().sort({ createdAt: -1 });
        res.status(200).json(ideas);
    } catch (error) {
        console.error('Error fetching business ideas:', error.message);
        res.status(500).json({ error: "Failed to fetch business ideas" });
    }
};