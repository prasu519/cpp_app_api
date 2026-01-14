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
          cr201status: data.cr201status,
          cr201feeder: data.cr201feeder,
          cr201feeder1coal: data.cr201feeder1coal,
          cr201feeder2coal: data.cr201feeder2coal,
          cr202status: data.cr202status,
          cr202feeder: data.cr202feeder,
          cr202feeder1coal: data.cr202feeder1coal,
          cr202feeder2coal: data.cr202feeder2coal,
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
  crusherStatusServiceFeedersTotal: async (
    fromdate,
    fromshift,
    todate,
    toshift,
    callback
  ) => {
    try {
      // ---------- validate shifts ----------
      const shiftOrder = ["A", "B", "C"];
      const startIdx = shiftOrder.indexOf(fromshift);
      const endIdx = shiftOrder.indexOf(toshift);
      if (startIdx === -1 || endIdx === -1) {
        return callback(new Error("Invalid shift. Use 'A', 'B' or 'C'."));
      }

      // ---------- normalize dates to midnight (day-only) ----------
      const startDate = new Date(fromdate);
      const endDate = new Date(todate);

      // If same date but fromShifS > toshift (wrap on next day), treat endDate as next day
      if (startDate.getTime() === endDate.getTime() && startIdx > endIdx) {
        endDate.setDate(endDate.getDate() + 1);
      }

      // ---------- build shift slices ----------
      const shiftsFromStart = shiftOrder.slice(startIdx); // from fromshift .. C
      const shiftsToEnd = shiftOrder.slice(0, endIdx + 1); // A .. toshift
      const allShifts = shiftOrder;

      // ---------- build matchCondition ----------
      let matchCondition;
      if (startDate.getTime() === endDate.getTime()) {
        // On same day and non-wrapping (startIdx <= endIdx): only shifts between fromshift..toshift
        if (startIdx > endIdx) {
          // This shouldn't happen because we handled same-day wrap above; still guard
          return callback(
            new Error(
              "Invalid range for same date. Use fromshift <= toshift or supply a later toDate."
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
            // start date: from fromshift .. C
            { date: startDate, shift: { $in: shiftsFromStart } },

            // end date: A .. toshift
            { date: endDate, shift: { $in: shiftsToEnd } },

            // dates strictly between startDate and endDate -> all shifts
            {
              date: { $gt: startDate, $lt: endDate },
              shift: { $in: allShifts },
            },
          ],
        };
      }
      const pipeline = [
        { $match: matchCondition },
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
            cr201Feeder1Total: { $sum: "$cr201feeder1coal" },
            cr201Feeder2Total: { $sum: "$cr201feeder2coal" },
            cr202Feeder1Total: { $sum: "$cr202feeder1coal" },
            cr202Feeder2Total: { $sum: "$cr202feeder2coal" },
          },
        },
      ];

      const result = await CrusherStatus.aggregate(pipeline);
      /*const result = await CrusherStatus.aggregate([
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
      ]);*/

      if (!result.length) {
        return callback(
          new Error("No Total Feeding found for the given date range")
        );
      }

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
        cr201Feeder1Total,
        cr201Feeder2Total,
        cr202Feeder1Total,
        cr202Feeder2Total,
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
        cr201Feeder1Total,
        cr201Feeder2Total,
        cr202Feeder1Total,
        cr202Feeder2Total,
      });
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  },
};
