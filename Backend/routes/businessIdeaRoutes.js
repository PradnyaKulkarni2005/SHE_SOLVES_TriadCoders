const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addBusinessIdea, getAllBusinessIdeas } = require("../controller/businessIdeaController");

// Configure Multer for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// Routes
router.post("/add", upload.single("poster"), addBusinessIdea);
router.get("/all", getAllBusinessIdeas);

module.exports = router;