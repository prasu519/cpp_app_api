const mongoose = require("mongoose");

const ShiftReportEnteredBySchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  empnum: {
    type: Number,
    required: true,
  },
  reportStatus: {
    type: Number,
    required: true,
    default: 0,
  },
});

ShiftReportEnteredBySchema.index({ date: 1, shift: 1 }, { unique: true });
const ShiftReportEnteredBy = mongoose.model(
  "ShiftReportEnteredBy",
  ShiftReportEnteredBySchema
);
module.exports = ShiftReportEnteredBy;
