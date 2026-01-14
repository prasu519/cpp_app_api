const mongoose = require("mongoose");

const crusherStatusSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  cr34status: {
    type: String,
  },
  cr34feeder: {
    type: String,
  },
  cr34feeder1coal: {
    type: Number,
  },
  cr34feeder2coal: {
    type: Number,
  },
  cr35status: {
    type: String,
  },
  cr35feeder: {
    type: String,
  },
  cr35feeder1coal: {
    type: Number,
  },
  cr35feeder2coal: {
    type: Number,
  },
  cr36status: {
    type: String,
  },
  cr36feeder: {
    type: String,
  },
  cr36feeder1coal: {
    type: Number,
  },
  cr36feeder2coal: {
    type: Number,
  },
  cr37status: {
    type: String,
  },
  cr37feeder: {
    type: String,
  },
  cr37feeder1coal: {
    type: Number,
  },
  cr37feeder2coal: {
    type: Number,
  },
  cr38status: {
    type: String,
  },
  cr38feeder: {
    type: String,
  },
  cr38feeder1coal: {
    type: Number,
  },
  cr38feeder2coal: {
    type: Number,
  },
  cr201status: {
    type: String,
  },
  cr201feeder: {
    type: String,
  },
  cr201feeder1coal: {
    type: Number,
  },
  cr201feeder2coal: {
    type: Number,
  },
  cr202status: {
    type: String,
  },
  cr202feeder: {
    type: String,
  },
  cr202feeder1coal: {
    type: Number,
  },
  cr202feeder2coal: {
    type: Number,
  },
});
crusherStatusSchema.index({ date: 1, shift: 1 }, { unique: true });
const CrusherStatus = mongoose.model("CrusherStatus", crusherStatusSchema);
module.exports = CrusherStatus;
