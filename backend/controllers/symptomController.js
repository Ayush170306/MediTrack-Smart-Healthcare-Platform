const SymptomLog = require("../models/SymptomLog");
const Prediction = require("../models/Prediction");

// Simple rule-based analysis (replaceable by ML later)
const analyzeSymptoms = (symptoms) => {
  if (symptoms.includes("fever") && symptoms.includes("cough")) {
    return {
      condition: "Possible Viral Infection",
      confidence: 75,
      recommendation: "Rest, hydration, and consult a doctor if symptoms persist"
    };
  }

  if (symptoms.includes("headache") && symptoms.includes("stress")) {
    return {
      condition: "Stress or Migraine",
      confidence: 65,
      recommendation: "Relaxation, adequate sleep, and hydration"
    };
  }

  return {
    condition: "General Discomfort",
    confidence: 50,
    recommendation: "Monitor symptoms and maintain healthy habits"
  };
};

exports.submitSymptoms = async (req, res) => {
  try {
    const { symptoms, severity, notes } = req.body;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ msg: "Symptoms are required" });
    }

    // Save symptom log
    const log = await SymptomLog.create({
      user: req.user,
      symptoms,
      severity,
      notes
    });

    // Analyze symptoms
    const analysis = analyzeSymptoms(symptoms.map(s => s.toLowerCase()));

    // Save prediction
    const prediction = await Prediction.create({
      user: req.user,
      symptomLog: log._id,
      predictedCondition: analysis.condition,
      confidenceScore: analysis.confidence,
      recommendation: analysis.recommendation
    });

    res.status(201).json({
      msg: "Symptoms submitted successfully",
      log,
      prediction
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
