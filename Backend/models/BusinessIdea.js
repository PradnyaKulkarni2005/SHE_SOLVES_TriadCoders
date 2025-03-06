const mongoose = require("mongoose");

const businessIdeaSchema = new mongoose.Schema({
    businessName: { type: String, required: true },
    description: { type: String, required: true },
    contactDetails: { type: String, required: true },
    poster: { type: String }, // This will store image URL/path
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("BusinessIdea", businessIdeaSchema);
