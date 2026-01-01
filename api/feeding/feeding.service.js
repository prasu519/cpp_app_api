const Feeding = require("../models/FeedingModel");

module.exports = {
  feedingService: async (data, callback) => {
    try {
      const addFeeding = new Feeding(data);
      await addFeeding.save();
      return callback(null, addFeeding);
    } catch (error) {
      return callback(error);
    }
  },

  feedingServiceRead: async (date, shift, callback) => {
    try {
      const getFeeding = await Feeding.find({ date: date, shift: shift });
      return callback(null, getFeeding);
    } catch (error) {
      return callback(error);
    }
  },

  feedingServiceReadDaywise: async (date, callback) => {
    try {
      const getFeedingdaywise = await Feeding.find({ date: date });
      return callback(null, getFeedingdaywise);
    } catch (error) {
      return callback(error);
    }
  },

  feedingServiceUpdate: async (data, callBack) => {
    try {
      const updateFeeding = await Feeding.updateOne(
        { date: data.date, shift: data.shift },
        {
          ct1: data.ct1,
          ct2: data.ct2,
          ct3: data.ct3,
          stream1: data.stream1,
          stream1A: data.stream1A,
          pathc: data.pathc,
          auto: data.auto,
          nonauto: data.nonauto,
          total_feeding: data.total_feeding,
        },
        { new: true }
      );
      return callBack(null, updateFeeding);
    } catch (error) {
      return callBack(error);
    }
  },
  feedingServiceDelete: async (date, shift, callback) => {
    try {
      const deleted = await Feeding.deleteMany({
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
  feedingServiceTotalFeeding: async (
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
            totalStream1: { $sum: "$stream1" },
            totalStream1A: { $sum: "$stream1A" },
            totalPathC: { $sum: "$pathc" },
            totalCt1: { $sum: "$ct1" },
            totalCt2: { $sum: "$ct2" },
            totalCt3: { $sum: "$ct3" },
          },
        },
      ];

      const result = await Feeding.aggregate(pipeline);

      if (!result.length) {
        return callback(
          new Error("No Total Feeding found for the given date range")
        );
      }

      // return individual totals
      const {
        totalStream1,
        totalStream1A,
        totalPathC,
        totalCt1,
        totalCt2,
        totalCt3,
      } = result[0];
      return callback(null, {
        totalStream1,
        totalStream1A,
        totalPathC,
        totalCt1,
        totalCt2,
        totalCt3,
      });
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  },
};
