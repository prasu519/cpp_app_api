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

  coaltowerstocksCShiftServiceReadExcel: async (
    fromdate,
    fromshift, // not used now
    todate,
    toshift, // not used now
    callback
  ) => {
    try {
      // ================= DATE NORMALIZATION =================
      const startDate = new Date(fromdate);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(todate);
      endDate.setHours(23, 59, 59, 999);

      // ================= MATCH CONDITION =================
      // ONLY C SHIFT between dates
      const matchCondition = {
        date: {
          $gte: startDate,
          $lte: endDate,
        },
        shift: "C",
      };

      // ================= PIPELINE =================
      const pipeline = [
        { $match: matchCondition },
        { $sort: { date: 1 } },

        {
          $group: {
            _id: "$date",
            rows: {
              $push: {
                date: {
                  $dateToString: {
                    format: "%d-%m-%Y",
                    date: "$date",
                  },
                },
                shift: "$shift",
                ct1stock: "$ct1stock",
                ct2stock: "$ct2stock",
                ct3stock: "$ct3stock",
                total_stock: {
                  $add: ["$ct1stock", "$ct2stock", "$ct3stock"],
                },
              },
            },
          },
        },

        { $sort: { _id: 1 } },

        {
          $project: {
            _id: 0,
            rows: 1,
          },
        },
      ];

      const result = await CoalTowerStock.aggregate(pipeline);

      if (!result.length) {
        return callback(new Error("No C shift coal tower stock found"));
      }

      const finalOutput = result.map((d) => d.rows);

      return callback(null, finalOutput);
    } catch (error) {
      console.error("Excel Service Error:", error);
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
