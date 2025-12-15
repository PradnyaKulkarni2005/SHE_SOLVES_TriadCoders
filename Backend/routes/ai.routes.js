const express = require("express");
const router = express.Router();

const { aiChat } = require("../controller/ai.controller");

router.post("/chat", aiChat);

module.exports = router;
