const PushingSchedule = require("../models/PushingScheduleModel");

module.exports = {
  pushingScheduleService: async (data, callback) => {
    try {
      const addPushingSchedule = new PushingSchedule(data);
      await addPushingSchedule.save();
      return callback(null, addPushingSchedule);
    } catch (error) {
      return callback(error);
    }
  },

  pushingScheduleServiceRead: async (date, shift, callback) => {
    try {
      const getPushingSchedule = await PushingSchedule.find({
        date: date,
        shift: shift,
      });
      return callback(null, getPushingSchedule);
    } catch (error) {
      return callback(error);
    }
  },

  pushingScheduleServiceReadDaywise: async (date, callback) => {
    try {
      const getPushingScheduleDaywise = await PushingSchedule.find({
        date: date,
      });

      return callback(null, getPushingScheduleDaywise);
    } catch (error) {
      return callback(error);
    }
  },

  pushingScheduleServiceUpdate: async (data, callBack) => {
    try {
      const updatePushingSchedule = await PushingSchedule.updateOne(
        { date: data.date, shift: data.shift },
        {
          bat1: data.bat1,
          bat2: data.bat2,
          bat3: data.bat3,
          bat4: data.bat4,
          bat5: data.bat5,
          total_pushings: data.total_pushings,
        },
        { new: true }
      );
      return callBack(null, updatePushingSchedule);
    } catch (error) {
      return callBack(error);
    }
  },
  pushingScheduleServiceDelete: async (date, shift, callback) => {
    try {
      const deleted = await PushingSchedule.deleteMany({
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
