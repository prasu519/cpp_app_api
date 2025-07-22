const Reclaiming = require("../models/ReclaimingModel");

module.exports = {
  reclaimingService: async (data, callback) => {
    console.log(data);
    try {
      const addReclaiming = new Reclaiming(data);
      await addReclaiming.save();
      return callback(null, addReclaiming);
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  },

  reclaimingServiceRead: async (date, shift, callback) => {
    try {
      const getReclaiming = await Reclaiming.find({ date: date, shift: shift });
      return callback(null, getReclaiming);
    } catch (error) {
      return callback(error);
    }
  },

  reclaimingServiceReadDaywise: async (date, callback) => {
    try {
      const getReclaimingdaywise = await Reclaiming.find({ date: date });
      return callback(null, getReclaimingdaywise);
    } catch (error) {
      return callback(error);
    }
  },

  reclaimingServiceUpdate: async (data, callBack) => {
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
          excoal1recl: data.excoal1recl,
          excoal2recl: data.excoal2recl,
          excoal3recl: data.excoal3recl,
          excoal4recl: data.excoal4recl,
          excoal5recl: data.excoal5recl,
          excoal6recl: data.excoal6recl,
          excoal7recl: data.excoal7recl,
          excoal8recl: data.excoal8recl,
          cpp3coal1name: data.cpp3coal1name,
          cpp3coal2name: data.cpp3coal2name,
          cpp3coal3name: data.cpp3coal3name,
          cpp3coal4name: data.cpp3coal4name,
          cpp3coal5name: data.cpp3coal5name,
          cpp3coal6name: data.cpp3coal6name,
          cpp3coal1recl: data.cpp3coal1recl,
          cpp3coal2recl: data.cpp3coal2recl,
          cpp3coal3recl: data.cpp3coal3recl,
          cpp3coal4recl: data.cpp3coal4recl,
          cpp3coal5recl: data.cpp3coal5recl,
          cpp3coal6recl: data.cpp3coal6recl,
          cc49recl: data.cc49recl,
          cc50recl: data.cc50recl,
          cc126recl: data.cc126recl,
          patharecl: data.patharecl,
          pathbrecl: data.pathbrecl,
          total_reclaiming: data.total_reclaiming,
          cpp3total_reclaiming: data.cpp3total_reclaiming,
        },
        { new: true }
      );
      return callBack(null, updateReclaiming);
    } catch (error) {
      return callBack(error);
    }
  },
  reclaimingServiceDelete: async (date, shift, callback) => {
    try {
      const deleted = await Reclaiming.deleteMany({
        date: date,
        shift: shift,
      });
      if (deleted.deletedCount === 0) {
        return callback(new Error("No report found to delete in reclaiming"));
      }
      return callback(null, deleted);
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  },
  reclaimingServiceTotalRecl: async (fromdate, todate, callback) => {
    try {
      //console.log(fromdate.todate);
      const totalRecl = await Reclaiming.aggregate([
        {
          $match: {
            date: { $gte: new Date(fromdate), $lte: new Date(todate) },
          },
        },
        {
          $group: {
            _id: null,
            totCC49Recl: { $sum: "$cc49recl" },
            totCC50Recl: { $sum: "$cc50recl" },
            totCC126Recl: { $sum: "$cc126recl" },
            totCpp1Recl: { $sum: "$total_reclaiming" },
            totCpp3Recl: { $sum: "$cpp3total_reclaiming" },
          },
        },
      ]);
      if (!totalRecl.length) {
        return callback(
          new Error("No Total Reclaiming found for the given date range")
        );
      }
      const {
        totCC49Recl,
        totCC50Recl,
        totCC126Recl,
        totCpp1Recl,
        totCpp3Recl,
      } = totalRecl[0];
      return callback(null, {
        totCC49Recl,
        totCC50Recl,
        totCC126Recl,
        totCpp1Recl,
        totCpp3Recl,
      });
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  },
  getTotalReclaimingByAllCoalNames: async (fromdate, todate, callback) => {
    try {
      const totals = await Reclaiming.aggregate([
        {
          $match: {
            date: { $gte: new Date(fromdate), $lte: new Date(todate) },
          },
        },
        {
          $project: {
            coalEntries: {
              $concatArrays: [
                [
                  { name: "$coal1name", recl: "$coal1recl" },
                  { name: "$coal2name", recl: "$coal2recl" },
                  { name: "$coal3name", recl: "$coal3recl" },
                  { name: "$coal4name", recl: "$coal4recl" },
                  { name: "$coal5name", recl: "$coal5recl" },
                  { name: "$coal6name", recl: "$coal6recl" },
                  { name: "$coal7name", recl: "$coal7recl" },
                  { name: "$coal8name", recl: "$coal8recl" },

                  { name: "$excoal1name", recl: "$excoal1recl" },
                  { name: "$excoal2name", recl: "$excoal2recl" },
                  { name: "$excoal3name", recl: "$excoal3recl" },
                  { name: "$excoal4name", recl: "$excoal4recl" },
                  { name: "$excoal5name", recl: "$excoal5recl" },
                  { name: "$excoal6name", recl: "$excoal6recl" },
                  { name: "$excoal7name", recl: "$excoal7recl" },
                  { name: "$excoal8name", recl: "$excoal8recl" },
                ],
              ],
            },
          },
        },
        { $unwind: "$coalEntries" },
        {
          $match: {
            "coalEntries.name": { $nin: [null, ""] }, // remove null names and empty string
          },
        },
        {
          $group: {
            _id: "$coalEntries.name",
            totalRecl: { $sum: "$coalEntries.recl" },
          },
        },
        {
          $project: {
            _id: 0,
            coalName: "$_id",
            totalReclaiming: "$totalRecl",
          },
        },
      ]);

      // Convert array to object: { MN: 5000, BWS: 2000, ... }
      const result = {};
      totals.forEach(({ coalName, totalReclaiming }) => {
        result[coalName] = totalReclaiming;
      });

      return callback(null, result);
    } catch (error) {
      console.error("Aggregation error:", error);
      return callback(error);
    }
  },
  getTotalReclaimingByAllCoalNamesCpp3: async (fromdate, todate, callback) => {
    try {
      const totals = await Reclaiming.aggregate([
        {
          $match: {
            date: { $gte: new Date(fromdate), $lte: new Date(todate) },
          },
        },
        {
          $project: {
            coalEntries: {
              $concatArrays: [
                [
                  { name: "$cpp3coal1name", recl: "$cpp3coal1recl" },
                  { name: "$cpp3coal2name", recl: "$cpp3coal2recl" },
                  { name: "$cpp3coal3name", recl: "$cpp3coal3recl" },
                  { name: "$cpp3coal4name", recl: "$cpp3coal4recl" },
                  { name: "$cpp3coal5name", recl: "$cpp3coal5recl" },
                  { name: "$cpp3coal6name", recl: "$cpp3coal6recl" },
                ],
              ],
            },
          },
        },
        { $unwind: "$coalEntries" },
        {
          $match: {
            "coalEntries.name": { $nin: [null, ""] }, // remove null names and empty string
          },
        },
        {
          $group: {
            _id: { $toUpper: "$coalEntries.name" }, // Normalize to UPPERCASE
            totalRecl: { $sum: "$coalEntries.recl" },
          },
        },
        {
          $project: {
            _id: 0,
            coalName: "$_id",
            totalReclaiming: "$totalRecl",
          },
        },
      ]);

      // Convert array to object: { MN: 5000, BWS: 2000, ... }
      const result = {};
      totals.forEach(({ coalName, totalReclaiming }) => {
        result[coalName] = totalReclaiming;
      });

      return callback(null, result);
    } catch (error) {
      console.error("Aggregation error:", error);
      return callback(error);
    }
  },
};
