const pool = require("../../cofig/database");
const Blend = require("../models/BlendModel");

module.exports = {
  blendServicePost: async (data, callback) => {
    /* pool.query(
      `insert into blend(date,shift,total,cn1,cp1,cn2,cp2,cn3,cp3,cn4,cp4,cn5,cp5,cn6,cp6,cn7,cp7,cn8,cp8) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.date,
        data.shift,
        data.total,
        data.cn1,
        data.cp1,
        data.cn2,
        data.cp2,
        data.cn3,
        data.cp3,
        data.cn4,
        data.cp4,
        data.cn5,
        data.cp5,
        data.cn6,
        data.cp6,
        data.cn7,
        data.cp7,
        data.cn8,
        data.cp8,
      ],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callBack(error);
        }
        console.log(results);
        return callBack(null, results);
      }
    );*/
    try {
      const addBlend = new Blend(data);
      await addBlend.save();
      return callback(null, addBlend);
    } catch (error) {
      console.log("Error posting blend data", error);
      return callback(error);
    }
  },

  blendServiceGet: async (date, shift, callback) => {
    const endDate = date + "T23:59:59.999+00:00";
    /*  pool.query(
      `select * from blend order by date desc`,
      [],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );*/
    try {
      const getBlend = await Blend.find({ date: { $lte: endDate } })
        .sort({ date: -1 })
        .limit(1);
      return callback(null, getBlend);
    } catch (error) {
      console.log("Blend Record not found");
      return callback(error);
    }
  },
};
