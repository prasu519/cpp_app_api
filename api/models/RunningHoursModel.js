const mongoose = require("mongoose");

const runningHoursSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  str2hrs: {
    type: Number,
  },
  str2min: {
    type: Number,
  },
  str3hrs: {
    type: Number,
  },
  str3min: {
    type: Number,
  },
  str4hrs: {
    type: Number,
  },
  str4min: {
    type: Number,
  },
  cc49hrs: {
    type: Number,
  },
  cc49min: {
    type: Number,
  },
  cc50hrs: {
    type: Number,
  },
  cc50min: {
    type: Number,
  },
  cc126hrs: {
    type: Number,
  },
  cc126min: {
    type: Number,
  },
});
runningHoursSchema.index({ date: 1, shift: 1 }, { unique: true });
const RunningHours = mongoose.model("RunningHours", runningHoursSchema);
module.exports = RunningHours;
