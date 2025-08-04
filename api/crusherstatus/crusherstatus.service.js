const CrusherStatus = require("../models/CrusherStatusModel");

module.exports = {
  crusherStatusService: async (data, callback) => {
    try {
      const addCrusherStatus = new CrusherStatus(data);
      await addCrusherStatus.save();
      return callback(null, addCrusherStatus);
    } catch (error) {
      return callback(error);
    }
  },

  crusherStatusServiceRead: async (date, shift, callback) => {
    try {
      const getCrusherStatus = await CrusherStatus.find({
        date: date,
        shift: shift,
      });
      return callback(null, getCrusherStatus);
    } catch (error) {
      return callback(error);
    }
  },

  crusherStatusServiceUpdate: async (data, callBack) => {
    try {
      const updateCrusherStatus = await CrusherStatus.updateOne(
        { date: data.date, shift: data.shift },
        {
          cr34status: data.cr34status,
          cr34feeder: data.cr34feeder,
          cr34feeder1coal: data.cr34feeder1coal,
          cr34feeder2coal: data.cr34feeder2coal,
          cr35status: data.cr35status,
          cr35feeder: data.cr35feeder,
          cr35feeder1coal: data.cr35feeder1coal,
          cr35feeder2coal: data.cr35feeder2coal,
          cr36status: data.cr36status,
          cr36feeder: data.cr36feeder,
          cr36feeder1coal: data.cr36feeder1coal,
          cr36feeder2coal: data.cr36feeder2coal,
          cr37status: data.cr37status,
          cr37feeder: data.cr37feeder,
          cr37feeder1coal: data.cr37feeder1coal,
          cr37feeder2coal: data.cr37feeder2coal,
          cr38status: data.cr38status,
          cr38feeder: data.cr38feeder,
          cr38feeder1coal: data.cr38feeder1coal,
          cr38feeder2coal: data.cr38feeder2coal,
        },
        { new: true }
      );
      return callBack(null, updateCrusherStatus);
    } catch (error) {
      return callBack(error);
    }
  },
  crusherStatusServiceDelete: async (date, shift, callback) => {
    try {
      const deleted = await CrusherStatus.deleteMany({
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
  crusherStatusServiceFeedersTotal: async (fromdate, todate, callback) => {
    console.log(fromdate, todate);
    try {
      const result = await CrusherStatus.aggregate([
        {
          $match: {
            date: { $gte: new Date(fromdate), $lte: new Date(todate) },
          },
        },
        {
          $group: {
            _id: null,
            cr34Feeder1Total: { $sum: "$cr34feeder1coal" },
            cr34Feeder2Total: { $sum: "$cr34feeder2coal" },
            cr35Feeder1Total: { $sum: "$cr35feeder1coal" },
            cr35Feeder2Total: { $sum: "$cr35feeder2coal" },
            cr36Feeder1Total: { $sum: "$cr36feeder1coal" },
            cr36Feeder2Total: { $sum: "$cr36feeder2coal" },
            cr37Feeder1Total: { $sum: "$cr37feeder1coal" },
            cr37Feeder2Total: { $sum: "$cr37feeder2coal" },
            cr38Feeder1Total: { $sum: "$cr38feeder1coal" },
            cr38Feeder2Total: { $sum: "$cr38feeder2coal" },
          },
        },
      ]);
      if (!result.length) {
        return callback(
          new Error("No Total Feeding found for the given date range")
        );
      }
      console.log(result);
      // return individual totals
      const {
        cr34Feeder1Total,
        cr34Feeder2Total,
        cr35Feeder1Total,
        cr35Feeder2Total,
        cr36Feeder1Total,
        cr36Feeder2Total,
        cr37Feeder1Total,
        cr37Feeder2Total,
        cr38Feeder1Total,
        cr38Feeder2Total,
      } = result[0];
      return callback(null, {
        cr34Feeder1Total,
        cr34Feeder2Total,
        cr35Feeder1Total,
        cr35Feeder2Total,
        cr36Feeder1Total,
        cr36Feeder2Total,
        cr37Feeder1Total,
        cr37Feeder2Total,
        cr38Feeder1Total,
        cr38Feeder2Total,
      });
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  },
};
