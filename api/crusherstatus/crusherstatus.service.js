const CrusherStatus = require("../models/CrusherStatusModel");

module.exports = {
  crusherStatusService: async (data, callback) => {
    try {
      const addCrusherStatus = new CrusherStatus(data);
      await addCrusherStatus.save();
      return callback(null, addCrusherStatus);
    } catch (error) {
      return callback(error);
    }
  },

  crusherStatusServiceRead: async (date, shift, callback) => {
    try {
      const getCrusherStatus = await CrusherStatus.find({
        date: date,
        shift: shift,
      });
      return callback(null, getCrusherStatus);
    } catch (error) {
      return callback(error);
    }
  },

  crusherStatusServiceUpdate: async (data, callBack) => {
    try {
      const updateCrusherStatus = await CrusherStatus.updateOne(
        { date: data.date, shift: data.shift },
        {
          /*bat1: data.bat1,
          bat2: data.bat2,
          bat3: data.bat3,
          bat4: data.bat4,
          bat5: data.bat5,
          total_pushings: data.total_pushings,*/
        },
        { new: true }
      );
      return callBack(null, updateCrusherStatus);
    } catch (error) {
      return callBack(error);
    }
  },
};
