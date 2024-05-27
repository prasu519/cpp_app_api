const pool = require("../../cofig/database");
const Reclaiming = require("../models/reclaimingModel");

module.exports = {
  reclaimingService: async (data, callback) => {
    /* pool.query(
      `insert into reclaiming(date,shift,coal1name,coal1recl,coal2name,coal2recl,coal3name,coal3recl,coal4name,coal4recl,coal5name,coal5recl,coal6name,coal6recl,coal7name,coal7recl,coal8name,coal8recl,cc49recl,cc50recl,cc126recl,total_reclaiming) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.date,
        data.shift,
        data.coal1name,
        data.coal1recl,
        data.coal2name,
        data.coal2recl,
        data.coal3name,
        data.coal3recl,
        data.coal4name,
        data.coal4recl,
        data.coal5name,
        data.coal5recl,
        data.coal6name,
        data.coal6recl,
        data.coal7name,
        data.coal7recl,
        data.coal8name,
        data.coal8recl,
        data.cc49recl,
        data.cc50recl,
        data.cc126recl,
        data.total_reclaiming,
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
      const addReclaiming = new Reclaiming(data);
      await addReclaiming.save();
      return callback(null, addReclaiming);
    } catch (error) {
      console.log("Error posting Reclaiming data", error);
      return callback(error);
    }
  },

  reclaimingServiceRead: async (date, shift, callback) => {
    /*pool.query(
      `select * from reclaiming where date=? and shift=?`,
      [date, shift],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );*/
    try {
      const getReclaiming = await Reclaiming.find({ date: date, shift: shift });
      return callback(null, getReclaiming);
    } catch (error) {
      console.log(
        "Reclaiming Record not found for date: " + date + ", shift: " + shift
      );
      return callback(error);
    }
  },

  reclaimingServiceUpdate: async (data, callBack) => {
    /*pool.query(
      `update reclaiming set  coal1recl=?,coal2recl=?,coal3recl=?,coal4recl=?,coal5recl=?,coal6recl=?,coal7recl=?,coal8recl=?,cc49recl=?,cc50recl=?,cc126recl=?,total_reclaiming=? where date=? and shift=?`,
      [
        data.coal1recl,
        data.coal2recl,
        data.coal3recl,
        data.coal4recl,
        data.coal5recl,
        data.coal6recl,
        data.coal7recl,
        data.coal8recl,
        data.cc49recl,
        data.cc50recl,
        data.cc126recl,
        data.total_reclaiming,
        data.date,
        data.shift,
      ],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );*/
    try {
      const updateReclaiming = await Reclaiming.updateOne(
        { date: data.date, shift: data.shift },
        {
          coal1recl: data.coal1recl,
          coal2recl: data.coal2recl,
          coal3recl: data.coal3recl,
          coal4recl: data.coal4recl,
          coal5recl: data.coal5recl,
          coal6recl: data.coal6recl,
          coal7recl: data.coal7recl,
          coal8recl: data.coal8recl,
          cc49recl: data.cc49recl,
          cc50recl: data.cc50recl,
          cc126recl: data.cc126recl,
          total_reclaiming: data.total_reclaiming,
        },
        { new: true }
      );
      return callBack(null, updateReclaiming);
    } catch (error) {
      console.log(
        "Reclaiming Record not updated for date: " +
          data.date +
          ", shift: " +
          data.shift
      );
      return callBack(error);
    }
  },
};
