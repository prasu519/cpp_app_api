const mongoose = require("mongoose");

const shiftDelaysSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  delayNumber: {
    type: Number,
  },
  fromTime: {
    type: String,
  },
  toTime: {
    type: String,
  },
  reason: {
    type: String,
  },
});
shiftDelaysSchema.index(
  { date: 1, shift: 1, delayNumber: 1 },
  { unique: true }
);
const ShiftDelays = mongoose.model("ShiftDelays", shiftDelaysSchema);
module.exports = ShiftDelays;
