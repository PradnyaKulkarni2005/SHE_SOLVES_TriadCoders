const express = require("express");
const router = express.Router();
const { getVideosByCategory } = require("../controller/youtube.controller");

router.get("/youtube", getVideosByCategory);

module.exports = router;
