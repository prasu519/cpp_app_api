const pool = require("../../cofig/database");
const ShiftDelays = require("../models/ShiftDelaysModel");

module.exports = {
  shiftDelayService: async (data, callback) => {
    /* pool.query(
      `insert into ShiftDelays(date,shift,delayNumber,fromTime,toTime,reason) values(?,?,?,?,?,?)`,
      [
        data.date,
        data.shift,
        data.delayNumber,
        data.fromTime,
        data.toTime,
        data.reason,
      ],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
        return callback(null, results);
      }
    );*/
    try {
      const addShiftDelays = new ShiftDelays(data);
      await addShiftDelays.save();
      return callback(null, addShiftDelays);
    } catch (error) {
      console.log("Error posting ShiftDelays Data: " + error);
      return callback(error);
    }
  },

  shiftDelayServiceRead: async (date, shift, callback) => {
    /*  pool.query(
      `select * from ShiftDelays where date=? and shift=?`,
      [date, shift],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
        return callback(null, results);
      }
    );*/
    try {
      const getShiftDelays = await ShiftDelays.find({
        date: date,
        shift: shift,
      });
      callback(null, getShiftDelays);
    } catch (error) {
      console.log(
        "shift delays record not found for date:" + date + "shift: " + shift
      );
      callback(error);
    }
  },

  shiftDelayServiceUpdate: async (data, callback) => {
    /* pool.query(
      `update ShiftDelays set fromTime=?,toTime=?,reason=? where date=? and shift=? and delayNumber=?`,
      [
        data.fromTime,
        data.toTime,
        data.reason,
        data.date,
        data.shift,
        data.delayNumber,
      ],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );*/
    try {
      const updateShiftDelay = await ShiftDelays.updateOne(
        { date: data.date, shift: data.shift, delayNumber: data.delayNumber },
        { fromTime: data.fromTime, toTime: data.toTime, reason: data.reason },
        { new: true }
      );
      return callback(null, updateShiftDelay);
    } catch (error) {
      console.log(
        "Error updating ShiftDelay of " +
          data.delayNumber +
          " for date: " +
          data.date +
          " shift: " +
          data.shift
      );
      return callback(error);
    }
  },

  shiftDelayServiceDelete: async (date, shift, delaynumber, callback) => {
    /* pool.query(
      `delete from ShiftDelays where date=? and shift=? and delayNumber=?`,
      [date, shift,delayNumber],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );*/

    try {
      const deleteShiftDelay = await ShiftDelays.deleteOne({
        date: date,
        shift: shift,
        delayNumber: delaynumber,
      });
      return callback(null, deleteShiftDelay);
    } catch (error) {
      console.log(
        "Error delete shift delay of " +
          delaynumber +
          "for date: " +
          date +
          " shift: " +
          shift +
          "Error :" +
          error
      );
      return callback(error);
    }
  },
};
