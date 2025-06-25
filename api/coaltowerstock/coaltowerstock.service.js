const CoalTowerStock = require("../models/CoalTowerStockModel");

module.exports = {
  coaltowerstockService: async (data, callback) => {
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
    try {
      const getCoalTowerStock = await CoalTowerStock.find({
        date: date,
        shift: shift,
      });
      return callback(null, getCoalTowerStock);
    } catch (error) {
      return callback(error);
    }
  },

  coaltowerstockServiceUpdate: async (data, callback) => {
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
      return callback(error);
    }
  },
  coaltowerstockServiceDelete: async (date, shift, callback) => {
    try {
      const deleted = await CoalTowerStock.deleteMany({
        date: date,
        shift: shift,
      });
      if (deleted.deletedCount === 0) {
        return callback(new Error("No matching shift report found to delete"));
      }
      return callback(null, deleted);
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  },
};
