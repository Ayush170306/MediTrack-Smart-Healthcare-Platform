const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    symptomLog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SymptomLog",
      required: true
    },
    predictedCondition: {
      type: String,
      required: true
    },
    confidenceScore: {
      type: Number,
      min: 0,
      max: 100
    },
    recommendation: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prediction", PredictionSchema);
