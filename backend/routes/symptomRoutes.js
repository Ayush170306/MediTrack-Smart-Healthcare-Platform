const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { submitSymptoms } = require("../controllers/symptomController");

router.post("/submit", authMiddleware, submitSymptoms);

module.exports = router;
