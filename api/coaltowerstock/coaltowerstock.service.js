const pool = require("../../cofig/database");
const CoalTowerStock = require("../models/CoalTowerStockModel");

module.exports = {
  coaltowerstockService: async (data, callback) => {
    /* pool.query(
      `insert into coaltowerstock(date,shift,ct1stock,ct2stock,ct3stock,total_stock) values(?,?,?,?,?,?)`,
      [
        data.date,
        data.shift,
        data.ct1stock,
        data.ct2stock,
        data.ct3stock,
        data.total_stock,
      ],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results);
      }
    );*/
    try {
      const addCoalTowerStock = new CoalTowerStock(data);
      await addCoalTowerStock.save();
      return callback(null, addCoalTowerStock);
    } catch (error) {
      console.log("Error posting coal tower stock data", error);
      return callback(error);
    }
  },

  coaltowerstockServiceRead: async (date, shift, callback) => {
    /* pool.query(
      `select * from coaltowerstock where date=? and shift=?`,
      [date, shift],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results);
      }
    );*/
    try {
      const getCoalTowerStock = await CoalTowerStock.find({
        date: date,
        shift: shift,
      });
      return callback(null, getCoalTowerStock);
    } catch (error) {
      console.log(
        "Caol tower stock Record not found for date: " +
          date +
          ", shift: " +
          shift
      );
      return callback(error);
    }
  },

  coaltowerstockServiceUpdate: async (data, callback) => {
    /* pool.query(
      `update coaltowerstock set ct1stock=?,ct2stock=?,ct3stock=?,total_stock=? where date=? and shift=?`,
      [
        data.ct1stock,
        data.ct2stock,
        data.ct3stock,
        data.total_stock,
        data.date,
        data.shift,
      ],
      (error, results, feilds) => {
        if (error) return callBack(error);
        return callBack(null, results);
      }
    );*/

    try {
      const updateCoalTowerStock = await CoalTowerStock.updateOne(
        { date: data.date, shift: data.shift },
        {
          ct1stock: data.ct1stock,
          ct2stock: data.ct2stock,
          ct3stock: data.ct3stock,
          total_stock: data.total_stock,
        },
        { new: true }
      );
      return callback(null, updateCoalTowerStock);
    } catch (error) {
      console.log(
        "Coal tower stock Record not updated for date: " +
          data.date +
          ", shift: " +
          data.shift
      );
      return callback(error);
    }
  },
};
