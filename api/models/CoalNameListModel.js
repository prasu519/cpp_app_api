const mongoose = require("mongoose");
const CoalNameListSchema = mongoose.Schema({
  coalname1: {
    type: String,
  },
  coalname2: {
    type: String,
  },
  coalname3: {
    type: String,
  },
  coalname4: {
    type: String,
  },
  coalname5: {
    type: String,
  },
  coalname6: {
    type: String,
  },
  coalname7: {
    type: String,
  },
  coalname8: {
    type: String,
  },
  coalname9: {
    type: String,
  },
  coalname10: {
    type: String,
  },
});
const CoalNameList = mongoose.model("CoalNameList", CoalNameListSchema);
module.exports = CoalNameList;
