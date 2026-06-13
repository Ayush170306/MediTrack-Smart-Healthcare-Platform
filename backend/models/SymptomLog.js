const mongoose = require("mongoose");

const SymptomLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    symptoms: {
      type: [String],
      required: true
    },
    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    },
    notes: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SymptomLog", SymptomLogSchema);
