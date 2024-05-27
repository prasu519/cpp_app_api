const mongoose = require("mongoose");

const coalAnalysisSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  ci: {
    type: String,
  },
  ash: {
    type: String,
  },
  vm: {
    type: String,
  },
  fc: {
    type: String,
  },
  tm: {
    type: String,
  },
});
coalAnalysisSchema.index({ date: 1, shift: 1 }, { unique: true });
const CoalAnalysis = mongoose.model("CoalAnalysis", coalAnalysisSchema);
module.exports = CoalAnalysis;
