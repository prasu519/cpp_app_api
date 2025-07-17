const CoalAnalysis = require("../models/CoalAnalysisModel");

module.exports = {
  coalAnalysisService: async (data, callback) => {
    try {
      const addCoalAnalysis = new CoalAnalysis(data);
      await addCoalAnalysis.save();
      return callback(null, addCoalAnalysis);
    } catch (error) {
      return callback(error);
    }
  },

  coalAnalysisServiceRead: async (date, shift, callback) => {
    try {
      const getCoalAnalysis = await CoalAnalysis.find({
        date: date,
        shift: shift,
      });
      return callback(null, getCoalAnalysis);
    } catch (error) {
      return callback(error);
    }
  },

  coalAnalysisServiceUpdate: async (data, callBack) => {
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
      return callBack(error);
    }
  },
  coalAnalysisServiceDelete: async (date, shift, callback) => {
    try {
      const deleted = await CoalAnalysis.deleteMany({
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
  coalAnalysisServiceAvgCI: async (fromdate, todate, callback) => {
    try {
      const avgCI = await CoalAnalysis.aggregate([
        {
          $match: {
            date: {
              $gte: new Date(fromdate),
              $lte: new Date(todate),
            },
          },
        },
        {
          $group: {
            _id: null,
            avgci: { $avg: { $toDouble: "$ci" } },
          },
        },
      ]);

      if (!avgCI.length || avgCI[0].avgci === 0) {
        return callback(new Error("Average of Crushing index not done"));
      }

      return callback(null, avgCI[0].avgci);
    } catch (error) {
      console.error(error);
      return callback(error);
    }
  },
};
