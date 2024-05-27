const pool = require("../../cofig/database");
const RunningHours = require("../models/RunningHoursModel");

module.exports = {
  runningHoursService: async (data, callback) => {
    /* pool.query(
      "insert into runninghours(date,shift,str2hrs,str2min,str3hrs,str3min,str4hrs,str4min,cc49hrs,cc49min,cc50hrs,cc50min,cc126hrs,cc126min) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.date,
        data.shift,
        data.str2hrs,
        data.str2min,
        data.str3hrs,
        data.str3min,
        data.str4hrs,
        data.str4min,
        data.cc49hrs,
        data.cc49min,
        data.cc50hrs,
        data.cc50min,
        data.cc126hrs,
        data.cc126min,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );*/

    try {
      const addRunningHours = new RunningHours(data);
      await addRunningHours.save();
      return callback(null, addRunningHours);
    } catch (error) {
      console.log("Error posting RunningHours data", error);
      return callback(error);
    }
  },

  runningHoursServiceRead: async (date, shift, callback) => {
    /* pool.query(
      "select * from runninghours where date=? and shift=?",
      [date, shift],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );*/
    try {
      const getRunningHours = await RunningHours.find({
        date: date,
        shift: shift,
      });
      return callback(null, getRunningHours);
    } catch (error) {
      console.log(
        "RunningHours Record not found for date: " + date + ", shift: " + shift
      );
      return callback(error);
    }
  },
  runningHoursServiceUpdate: async (data, callBack) => {
    /*  pool.query(
      `update runninghours set  str2hrs=?,str2min=?,str3hrs=?,str3min=?,str4hrs=?,str4min=?,cc49hrs=?,cc49min=?,cc50hrs=?,cc50min=?,cc126hrs=?,cc126min=? where date=? and shift=?`,
      [
        data.str2hrs,
        data.str2min,
        data.str3hrs,
        data.str3min,
        data.str4hrs,
        data.str4min,
        data.cc49hrs,
        data.cc49min,
        data.cc50hrs,
        data.cc50min,
        data.cc126hrs,
        data.cc126min,
        data.date,
        data.shift,
      ],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );*/
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
      console.log(
        "RunningHours Record not updated for date: " +
          data.date +
          ", shift: " +
          data.shift
      );
      return callBack(error);
    }
  },
};
