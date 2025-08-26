const CoalNameList = require("../models/CoalNameListModel");
module.exports = {
  coalNameListServiceRead: async (callback) => {
    try {
      const getCoalNameList = await CoalNameList.find();
      return callback(null, getCoalNameList);
    } catch (error) {
      console.log("Error while getting coal name list", error);
      return callback(error);
    }
  },
};
