const MbTopStock = require("../models/MbTopStockModel");

module.exports = {
  mbtopstockService: async (data, callback) => {
    try {
      const addMbTopStock = new MbTopStock(data);
      await addMbTopStock.save();
      return callback(null, addMbTopStock);
    } catch (error) {
      return callback(error);
    }
  },
  mbtopstockServiceRead: async (date, shift, callback) => {
    try {
      const getMbTopStock = await MbTopStock.find({ date: date, shift: shift });
      return callback(null, getMbTopStock);
    } catch (error) {
      return callback(error);
    }
  },
  mbtopstockServiceUpdate: async (data, callBack) => {
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
          oldcoal1stock: data.oldcoal1stock,
          oldcoal2stock: data.oldcoal2stock,
          oldcoal3stock: data.oldcoal3stock,
          oldcoal4stock: data.oldcoal4stock,
          oldcoal5stock: data.oldcoal5stock,
          oldcoal6stock: data.oldcoal6stock,
          oldcoal7stock: data.oldcoal7stock,
          oldcoal8stock: data.oldcoal8stock,
          cpp3coal1name: data.cpp3coal1name,
          cpp3coal2name: data.cpp3coal2name,
          cpp3coal3name: data.cpp3coal3name,
          cpp3coal4name: data.cpp3coal4name,
          cpp3coal5name: data.cpp3coal5name,
          cpp3coal6name: data.cpp3coal6name,
          cpp3coal1stock: data.cpp3coal1stock,
          cpp3coal2stock: data.cpp3coal2stock,
          cpp3coal3stock: data.cpp3coal3stock,
          cpp3coal4stock: data.cpp3coal4stock,
          cpp3coal5stock: data.cpp3coal5stock,
          cpp3coal6stock: data.cpp3coal6stock,
          total_stock: data.total_stock,
          cpp3total_stock: data.cpp3total_stock,
        },
        { new: true }
      );
      return callBack(null, updateMbTopStock);
    } catch (error) {
      return callBack(error);
    }
  },
  mbtopstockServiceDelete: async (date, shift, callback) => {
    try {
      const deleted = await MbTopStock.deleteMany({
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
