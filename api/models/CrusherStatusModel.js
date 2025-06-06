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
  cr35status: {
    type: String,
  },
  cr35feeder: {
    type: String,
  },
  cr36status: {
    type: String,
  },
  cr36feeder: {
    type: String,
  },
  cr37status: {
    type: String,
  },
  cr37feeder: {
    type: String,
  },
  cr38status: {
    type: String,
  },
  cr38feeder: {
    type: String,
  },
});
crusherStatusSchema.index({ date: 1, shift: 1 }, { unique: true });
const CrusherStatus = mongoose.model("CrusherStatus", crusherStatusSchema);
module.exports = CrusherStatus;
