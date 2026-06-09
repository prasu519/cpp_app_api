const mongoose = require("mongoose");

const crusherDetailsSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  cr34hcd: {
    type: Date,
  },
  cr34lpcd: {
    type: Date,
  },
  cr34fcd: {
    type: Date,
  },
  cr34fcs: {
    type: String,
  },
  cr35hcd: {
    type: Date,
  },
  cr35lpcd: {
    type: Date,
  },
  cr35fcd: {
    type: Date,
  },
  cr35fcs: {
    type: String,
  },
  cr36hcd: {
    type: Date,
  },
  cr36lpcd: {
    type: Date,
  },
  cr36fcd: {
    type: Date,
  },
  cr36fcs: {
    type: String,
  },
  cr37hcd: {
    type: Date,
  },
  cr37lpcd: {
    type: Date,
  },
  cr37fcd: {
    type: Date,
  },
  cr37fcs: {
    type: String,
  },
  cr38hcd: {
    type: Date,
  },
  cr38lpcd: {
    type: Date,
  },
  cr38fcd: {
    type: Date,
  },
  cr38fcs: {
    type: String,
  },
  cr201hcd: {
    type: Date,
  },
  cr201lpcd: {
    type: Date,
  },
  cr201fcd: {
    type: Date,
  },
  cr201fcs: {
    type: String,
  },
  cr202hcd: {
    type: Date,
  },
  cr202lpcd: {
    type: Date,
  },
  cr202fcd: {
    type: Date,
  },
  cr202fcs: {
    type: String,
  },
});
crusherDetailsSchema.index({ date: 1, shift: 1 }, { unique: true });
const CrusherDetails = mongoose.model("CrusherDetails", crusherDetailsSchema);
module.exports = CrusherDetails;
