const pool = require("../../cofig/database");
const MbTopStock = require("../models/MbTopStockModel");

module.exports = {
  mbtopstockService: async (data, callback) => {
    /* pool.query(
      `insert into mbtop_stocks(date,shift,coal1name,coal1stock,coal2name,coal2stock,coal3name,coal3stock,coal4name,coal4stock,coal5name,coal5stock,coal6name,coal6stock,coal7name,coal7stock,coal8name,coal8stock,total_stock) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.date,
        data.shift,
        data.coal1name,
        data.coal1stock,
        data.coal2name,
        data.coal2stock,
        data.coal3name,
        data.coal3stock,
        data.coal4name,
        data.coal4stock,
        data.coal5name,
        data.coal5stock,
        data.coal6name,
        data.coal6stock,
        data.coal7name,
        data.coal7stock,
        data.coal8name,
        data.coal8stock,
        data.total_stock,
      ],
      (error, results, fields) => {
        if (error) return callback(error);
        return callback(null, results);
      }
    );*/

    try {
      const addMbTopStock = new MbTopStock(data);
      await addMbTopStock.save();
      return callback(null, addMbTopStock);
    } catch (error) {
      console.log("Error add mb top stock data", error);
      return callback(error);
    }
  },
  mbtopstockServiceRead: async (date, shift, callback) => {
    /* pool.query(
      `select * from mbtop_stocks where date=? and shift=?`,
      [date, shift],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );*/
    try {
      const getMbTopStock = await MbTopStock.find({ date: date, shift: shift });
      return callback(null, getMbTopStock);
    } catch (error) {
      console.log("Error get mb top stock data", error);
      return callback(error);
    }
  },
  mbtopstockServiceUpdate: async (data, callBack) => {
    /* pool.query(
      `update mbtop_stocks set  coal1stock=?,coal2stock=?,coal3stock=?,coal4stock=?,coal5stock=?,coal6stock=?,coal7stock=?,coal8stock=?,total_stock=? where date=? and shift=?`,
      [
        data.coal1stock,
        data.coal2stock,
        data.coal3stock,
        data.coal4stock,
        data.coal5stock,
        data.coal6stock,
        data.coal7stock,
        data.coal8stock,
        data.total_stock,
        data.date,
        data.shift,
      ],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );*/
    try {
      const updateMbTopStock = await MbTopStock.updateOne(
        { date: data.date, shift: data.shift },
        {
          coal1stock: data.coal1stock,
          coal2stock: data.coal2stock,
          coal3stock: data.coal3stock,
          coal4stock: data.coal4stock,
          coal5stock: data.coal5stock,
          coal6stock: data.coal6stock,
          coal7stock: data.coal7stock,
          coal8stock: data.coal8stock,
          total_stock: data.total_stock,
        },
        { new: true }
      );
      return callBack(null, updateMbTopStock);
    } catch (error) {
      console.log(
        "Update Record not updated for date: " +
          data.date +
          ", shift: " +
          data.shift
      );
      return callBack(error);
    }
  },
};
