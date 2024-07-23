const mongoose = require("mongoose");

const feedingSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  ct1: {
    type: Number,
  },
  ct2: {
    type: Number,
  },
  ct3: {
    type: Number,
  },
  stream1: {
    type: Number,
  },
  stream1A: {
    type: Number,
  },
  New_Stream: {
    type: Number,
  },
  total_feeding: {
    type: Number,
  },
});

feedingSchema.index({ date: 1, shift: 1 }, { unique: true });

const Feeding = mongoose.model("Feeding", feedingSchema);
module.exports = Feeding;
