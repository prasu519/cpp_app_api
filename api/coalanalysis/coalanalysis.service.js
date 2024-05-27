const pool = require("../../cofig/database");
const CoalAnalysis = require("../models/CoalAnalysisModel");

module.exports = {
  coalAnalysisService: async (data, callback) => {
    /* pool.query(
      `insert into coal_analysis(date,shift,ci,ash,vm,fc,tm) values(?,?,?,?,?,?,?)`,
      [data.date, data.shift, data.ci, data.ash, data.vm, data.fc, data.tm],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );*/
    try {
      const addCoalAnalysis = new CoalAnalysis(data);
      await addCoalAnalysis.save();
      return callback(null, addCoalAnalysis);
    } catch (error) {
      console.log("Error posting coalAnalysis data", error);
      return callback(error);
    }
  },

  coalAnalysisServiceRead: async (date, shift, callback) => {
    /* pool.query(
      `select * from coal_analysis where date=? and shift=?`,
      [date, shift],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, results);
      }
    );*/
    try {
      const getCoalAnalysis = await CoalAnalysis.find({
        date: date,
        shift: shift,
      });
      return callback(null, getCoalAnalysis);
    } catch (error) {
      console.log(
        "CoalAnalysis Record not found for date: " + date + ", shift: " + shift
      );
      return callback(error);
    }
  },

  coalAnalysisServiceUpdate: async (data, callBack) => {
    /* pool.query(
      `update coal_analysis set ci=?, ash=?, vm=?, fc=?, tm=? where date = ? and shift = ?`,
      [data.ci, data.ash, data.vm, data.fc, data.tm, data.date, data.shift],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );*/
    try {
      const updateCoalAnalysis = await CoalAnalysis.updateOne(
        { date: data.date, shift: data.shift },
        {
          ci: data.ci,
          ash: data.ash,
          vm: data.vm,
          fc: data.fc,
          tm: data.tm,
        },
        { new: true }
      );
      return callBack(null, updateCoalAnalysis);
    } catch (error) {
      console.log(
        "CoalAnalysis Record not updated for date: " +
          data.date +
          ", shift: " +
          data.shift
      );
      return callBack(error);
    }
  },
};
