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
  /* coalAnalysisServiceAvgCI: async (fromdate, todate, callback) => {
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
      console.log(avgCI);
      return callback(null, avgCI[0].avgci);
    } catch (error) {
      console.error(error);
      return callback(error);
    }
  },*/

  /* coalAnalysisServiceAvgCI: async (
    fromdate,
    fromShift,
    todate,
    toShift,
    callback
  ) => {
    try {
      // Convert input dates to proper MongoDB date objects
      const startDate = new Date(fromdate);
      const endDate = new Date(todate);

      // Define shift order
      const shiftOrder = ["A", "B", "C"];

      let allowedShifts = [];

      if (shiftOrder.indexOf(fromShift) <= shiftOrder.indexOf(toShift)) {
        // Normal order (A→B→C)
        allowedShifts = shiftOrder.slice(
          shiftOrder.indexOf(fromShift),
          shiftOrder.indexOf(toShift) + 1
        );
      } else {
        // Reverse order (e.g., B→A means wrap to next day)
        allowedShifts = [
          ...shiftOrder.slice(shiftOrder.indexOf(fromShift)), // fromShift → C
          ...shiftOrder.slice(0, shiftOrder.indexOf(toShift) + 1), // A → toShift
        ];
      }

      // MongoDB Aggregation
      const avgCI = await CoalAnalysis.aggregate([
        {
          $match: {
            date: { $gte: startDate, $lte: endDate },
            shift: { $in: allowedShifts },
          },
        },
        {
          $group: {
            _id: null,
            sumCi: { $sum: { $toDouble: "$ci" } },
            avgci: { $avg: { $toDouble: "$ci" } },
            samples: { $push: "$ci" },
          },
        },
      ]);

      if (!avgCI.length || avgCI[0].avgci === 0) {
        return callback(new Error("Average of Crushing Index not available"));
      }
      console.log(avgCI, allowedShifts, startDate, endDate);
      return callback(null, avgCI[0].avgci);
    } catch (error) {
      console.error(error);
      return callback(error);
    }
  },*/

  coalAnalysisServiceAvgCI: async (
    fromdate,
    fromShift,
    todate,
    toShift,
    callback
  ) => {
    try {
      // ---------- validate shifts ----------
      const shiftOrder = ["A", "B", "C"];
      const startIdx = shiftOrder.indexOf(fromShift);
      const endIdx = shiftOrder.indexOf(toShift);
      if (startIdx === -1 || endIdx === -1) {
        return callback(new Error("Invalid shift. Use 'A', 'B' or 'C'."));
      }

      // ---------- normalize dates to midnight (day-only) ----------
      const startDate = new Date(fromdate);
      const endDate = new Date(todate);

      // If same date but fromShift > toShift (wrap on next day), treat endDate as next day
      if (startDate.getTime() === endDate.getTime() && startIdx > endIdx) {
        endDate.setDate(endDate.getDate() + 1);
      }

      // ---------- build shift slices ----------
      const shiftsFromStart = shiftOrder.slice(startIdx); // from fromShift .. C
      const shiftsToEnd = shiftOrder.slice(0, endIdx + 1); // A .. toShift
      const allShifts = shiftOrder;

      // ---------- build matchCondition ----------
      let matchCondition;
      if (startDate.getTime() === endDate.getTime()) {
        // On same day and non-wrapping (startIdx <= endIdx): only shifts between fromShift..toShift
        if (startIdx > endIdx) {
          // This shouldn't happen because we handled same-day wrap above; still guard
          return callback(
            new Error(
              "Invalid range for same date. Use fromShift <= toShift or supply a later toDate."
            )
          );
        }
        matchCondition = {
          date: startDate,
          shift: { $in: shiftOrder.slice(startIdx, endIdx + 1) },
        };
      } else {
        // Different dates: three-part OR
        matchCondition = {
          $or: [
            // start date: from fromShift .. C
            { date: startDate, shift: { $in: shiftsFromStart } },

            // end date: A .. toShift
            { date: endDate, shift: { $in: shiftsToEnd } },

            // dates strictly between startDate and endDate -> all shifts
            {
              date: { $gt: startDate, $lt: endDate },
              shift: { $in: allShifts },
            },
          ],
        };
      }

      // ---------- aggregation pipeline ----------
      const pipeline = [
        { $match: matchCondition },

        // Reduce to one value per (date, shift): average ci for that date+shift
        {
          $group: {
            _id: { date: "$date", shift: "$shift" },
            ciPerShift: { $avg: { $toDouble: "$ci" } },
            docsCount: { $sum: 1 },
          },
        },

        // Now average those per-shift values
        {
          $group: {
            _id: null,
            countShifts: { $sum: 1 },
            sumOfShiftAverages: { $sum: "$ciPerShift" },
            avgci: { $avg: "$ciPerShift" },
            samples: {
              $push: {
                date: "$_id.date",
                shift: "$_id.shift",
                ciPerShift: "$ciPerShift",
                docsCount: "$docsCount",
              },
            },
          },
        },
      ];

      const res = await CoalAnalysis.aggregate(pipeline);

      if (!res.length || res[0].countShifts === 0) {
        return callback(new Error("Average of Crushing Index not available"));
      }

      // Debug info (remove or comment out in production)
      /* console.log("PER-SHIFT DEBUG:", res[0], {
        startDate,
        endDate,
        fromShift,
        toShift,
        matchCondition,
      });*/

      return callback(null, res[0].avgci);
    } catch (error) {
      console.error(error);
      return callback(error);
    }
  },
};
