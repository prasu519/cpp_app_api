const mongoose = require("mongoose");

const pushingScheduleSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  bat1: {
    type: Number,
  },
  bat2: {
    type: Number,
  },
  bat3: {
    type: Number,
  },
  bat4: {
    type: Number,
  },
  bat5: {
    type: Number,
  },
  total_pushings: {
    type: Number,
  },
});
pushingScheduleSchema.index({ date: 1, shift: 1 }, { unique: true });
const PushingSchedule = mongoose.model(
  "PushingSchedule",
  pushingScheduleSchema
);
module.exports = PushingSchedule;
