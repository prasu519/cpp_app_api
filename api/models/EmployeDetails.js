const mongoose = require("mongoose");

const EmployeDetailsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  empnum: {
    type: Number,
    required: true,
  },
});

EmployeDetailsSchema.index({ empnum: 1 }, { unique: true });
const EmployeDetails = mongoose.model("EmployeDetails", EmployeDetailsSchema);
module.exports = EmployeDetails;
