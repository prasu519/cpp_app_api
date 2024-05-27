const pool = require("../../cofig/database");
const Feeding = require("../models/FeedingModel");

module.exports = {
  feedingService: async (data, callback) => {
    /* pool.query(
      `insert into feeding(date,shift,ct1,ct2,ct3,stream1,stream1A,total_feeding) values(?,?,?,?,?,?,?,?)`,
      [
        data.date,
        data.shift,
        data.ct1,
        data.ct2,
        data.ct3,
        data.stream1,
        data.stream1A,
        data.total_feeding,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );*/

    try {
      const addFeeding = new Feeding(data);
      await addFeeding.save();
      return callback(null, addFeeding);
    } catch (error) {
      console.log("Error posting feeding data", error);
      return callback(error);
    }
  },

  feedingServiceRead: async (date, shift, callback) => {
    /* pool.query(
      `select * from feeding where date=? and shift=?`,
      [date, shift],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, results);
      }
    );*/
    try {
      const getFeeding = await Feeding.find({ date: date, shift: shift });
      return callback(null, getFeeding);
    } catch (error) {
      console.log(
        "Feeding Record not found for date: " + date + ", shift: " + shift
      );
      return callback(error);
    }
  },

  feedingServiceUpdate: async (data, callBack) => {
    /*pool.query(
      `update feeding set ct1=?, ct2=?, ct3=?, stream1=?, stream1A=?, total_feeding=? where date = ? and shift = ?`,
      [
        data.ct1,
        data.ct2,
        data.ct3,
        data.stream1,
        data.stream1A,
        data.total_feeding,
        data.date,
        data.shift,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );*/
    try {
      const updateFeeding = await Feeding.updateOne(
        { date: data.date, shift: data.shift },
        {
          ct1: data.ct1,
          ct2: data.ct2,
          ct3: data.ct3,
          stream1: data.stream1,
          stream1A: data.stream1A,
          total_feeding: data.total_feeding,
        },
        { new: true }
      );
      return callBack(null, updateFeeding);
    } catch (error) {
      console.log(
        "Feeding Record not updated for date: " +
          data.date +
          ", shift: " +
          data.shift
      );
      return callBack(error);
    }
  },
};
