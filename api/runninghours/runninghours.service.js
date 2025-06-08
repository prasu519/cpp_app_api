const RunningHours = require("../models/RunningHoursModel");

module.exports = {
  runningHoursService: async (data, callback) => {
    try {
      const addRunningHours = new RunningHours(data);
      await addRunningHours.save();
      return callback(null, addRunningHours);
    } catch (error) {
      return callback(error);
    }
  },

  runningHoursServiceRead: async (date, shift, callback) => {
    try {
      const getRunningHours = await RunningHours.find({
        date: date,
        shift: shift,
      });
      return callback(null, getRunningHours);
    } catch (error) {
      return callback(error);
    }
  },

  runningHoursServiceReadDaywise: async (date, callback) => {
    try {
      const getRunningHoursDaywise = await RunningHours.find({
        date: date,
      });
      return callback(null, getRunningHoursDaywise);
    } catch (error) {
      return callback(error);
    }
  },

  runningHoursServiceUpdate: async (data, callBack) => {
    try {
      const updateRunningHours = await RunningHours.updateOne(
        { date: data.date, shift: data.shift },
        {
          str2hrs: data.str2hrs,
          str2min: data.str2min,
          str3hrs: data.str3hrs,
          str3min: data.str3min,
          str4hrs: data.str4hrs,
          str4min: data.str4min,
          cc49hrs: data.cc49hrs,
          cc49min: data.cc49min,
          cc50hrs: data.cc50hrs,
          cc50min: data.cc50min,
          cc126hrs: data.cc126hrs,
          cc126min: data.cc126min,
        },
        { new: true }
      );
      return callBack(null, updateRunningHours);
    } catch (error) {
      return callBack(error);
    }
  },
};
