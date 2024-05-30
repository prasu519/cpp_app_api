const ShiftDelays = require("../models/ShiftDelaysModel");

module.exports = {
  shiftDelayService: async (data, callback) => {
    try {
      const addShiftDelays = new ShiftDelays(data);
      await addShiftDelays.save();
      return callback(null, addShiftDelays);
    } catch (error) {
      return callback(error);
    }
  },

  shiftDelayServiceRead: async (date, shift, callback) => {
    try {
      const getShiftDelays = await ShiftDelays.find({
        date: date,
        shift: shift,
      });
      callback(null, getShiftDelays);
    } catch (error) {
      callback(error);
    }
  },

  shiftDelayServiceUpdate: async (data, callback) => {
    try {
      const updateShiftDelay = await ShiftDelays.updateOne(
        { date: data.date, shift: data.shift, delayNumber: data.delayNumber },
        { fromTime: data.fromTime, toTime: data.toTime, reason: data.reason },
        { new: true }
      );
      return callback(null, updateShiftDelay);
    } catch (error) {
      return callback(error);
    }
  },

  shiftDelayServiceDelete: async (date, shift, delaynumber, callback) => {
    try {
      const deleteShiftDelay = await ShiftDelays.deleteOne({
        date: date,
        shift: shift,
        delayNumber: delaynumber,
      });
      return callback(null, deleteShiftDelay);
    } catch (error) {
      return callback(error);
    }
  },
};
