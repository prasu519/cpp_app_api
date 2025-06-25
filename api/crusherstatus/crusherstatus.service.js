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
          cr34status: data.cr34status,
          cr34feeder: data.cr34feeder,
          cr35status: data.cr35status,
          cr35feeder: data.cr35feeder,
          cr36status: data.cr36status,
          cr36feeder: data.cr36feeder,
          cr37status: data.cr37status,
          cr37feeder: data.cr37feeder,
          cr38status: data.cr38status,
          cr38feeder: data.cr38feeder,
        },
        { new: true }
      );
      return callBack(null, updateCrusherStatus);
    } catch (error) {
      return callBack(error);
    }
  },
  crusherStatusServiceDelete: async (date, shift, callback) => {
    try {
      const deleted = await CrusherStatus.deleteMany({
        date: date,
        shift: shift,
      });
      if (deleted.deletedCount === 0) {
        return callback(new Error("No matching shift report found to delete"));
      }
      return callback(null, deleted);
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  },
};
