const mongoose = require("mongoose");

const blendSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  empnum: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
  },
  cn1: {
    type: String,
  },
  cp1: {
    type: Number,
  },
  cn2: {
    type: String,
  },
  cp2: {
    type: Number,
  },
  cn3: {
    type: String,
  },
  cp3: {
    type: Number,
  },
  cn4: {
    type: String,
  },
  cp4: {
    type: Number,
  },
  cn5: {
    type: String,
  },
  cp5: {
    type: Number,
  },
  cn6: {
    type: String,
  },
  cp6: {
    type: Number,
  },
  cn7: {
    type: String,
  },
  cp7: {
    type: Number,
  },
  cn8: {
    type: String,
  },
  cp8: {
    type: Number,
  },
});
blendSchema.index({ date: 1, shift: 1 }, { unique: true });
const Blend = mongoose.model("Blend", blendSchema);
module.exports = Blend;
