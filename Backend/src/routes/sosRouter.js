const express = require("express");
const router = express.Router();

// ✅ Import Controllers
const { sendSOS, getSOS } = require("../controller/sosController");
const { getFloodNews } = require("../controller/newsController");

// ----------------------
// SOS Routes
// ----------------------
router.post("/", sendSOS); // POST /api/sos
router.get("/", getSOS);   // GET /api/sos (latest 20)

// ----------------------
// Flood News Routes (optional)
// ----------------------
router.get("/flood-news", getFloodNews);

module.exports = router;
