const pool = require("../../cofig/database");
const PushingSchedule = require("../models/PushingScheduleModel");

module.exports = {
  pushingScheduleService: async (data, callback) => {
    /* pool.query(
      `insert into pushings_schedule(date,shift,bat1,bat2,bat3,bat4,bat5,total_pushings) values(?,?,?,?,?,?,?,?)`,
      [
        data.date,
        data.shift,
        data.bat1,
        data.bat2,
        data.bat3,
        data.bat4,
        data.bat5,
        data.totalPushings,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );*/
    try {
      const addPushingSchedule = new PushingSchedule(data);
      await addPushingSchedule.save();
      return callback(null, addPushingSchedule);
    } catch (error) {
      console.log("Error posting pushing schedule data", error);
      return callback(error);
    }
  },

  pushingScheduleServiceRead: async (date, shift, callback) => {
    /* pool.query(
      `select * from pushings_schedule where date=? and shift=?`,
      [date, shift],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );*/
    try {
      const getPushingSchedule = await PushingSchedule.find({
        date: date,
        shift: shift,
      });
      return callback(null, getPushingSchedule);
    } catch (error) {
      console.log(
        "Pushing schedule Record not found for date: " +
          date +
          ", shift: " +
          shift
      );
      return callback(error);
    }
  },

  pushingScheduleServiceUpdate: async (data, callBack) => {
    /* pool.query(
      `update pushings_schedule set bat1=?,bat2=?,bat3=?,bat4=?,bat5=?,total_pushings=? where date=? and shift=?`,
      [
        data.bat1,
        data.bat2,
        data.bat3,
        data.bat4,
        data.bat5,
        data.total_pushings,
        data.date,
        data.shift,
      ],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );*/
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
      console.log(
        "Pushing Schedule Record not updated for date: " +
          data.date +
          ", shift: " +
          data.shift
      );
      return callBack(error);
    }
  },
};
