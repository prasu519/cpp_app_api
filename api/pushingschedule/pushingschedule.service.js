const PushingSchedule = require("../models/PushingScheduleModel");

module.exports = {
  pushingScheduleService: async (data, callback) => {
    try {
      const addPushingSchedule = new PushingSchedule(data);
      await addPushingSchedule.save();
      return callback(null, addPushingSchedule);
    } catch (error) {
      return callback(error);
    }
  },

  pushingScheduleServiceRead: async (date, shift, callback) => {
    try {
      const getPushingSchedule = await PushingSchedule.find({
        date: date,
        shift: shift,
      });
      return callback(null, getPushingSchedule);
    } catch (error) {
      return callback(error);
    }
  },

  pushingScheduleServiceReadDaywise: async (date, callback) => {
    try {
      const getPushingScheduleDaywise = await PushingSchedule.find({
        date: date,
      });

      return callback(null, getPushingScheduleDaywise);
    } catch (error) {
      return callback(error);
    }
  },

  pushingScheduleServiceUpdate: async (data, callBack) => {
    try {
      const updatePushingSchedule = await PushingSchedule.updateOne(
        { date: data.date, shift: data.shift },
        {
          bat1: data.bat1,
          bat2: data.bat2,
          bat3: data.bat3,
          bat4: data.bat4,
          bat5: data.bat5,
          total_pushings: data.total_pushings,
        },
        { new: true }
      );
      return callBack(null, updatePushingSchedule);
    } catch (error) {
      return callBack(error);
    }
  },
  pushingScheduleServiceDelete: async (date, shift, callback) => {
    try {
      const deleted = await PushingSchedule.deleteMany({
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
  pushingScheduleServiceTotPushings: async (
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
            totpushings: { $sum: "$total_pushings" },
          },
        },
      ];
      const result = await PushingSchedule.aggregate(pipeline);

      //console.log(fromdate.todate);
      /*  const totpush = await PushingSchedule.aggregate([
        {
          $match: {
            date: { $gte: new Date(fromdate), $lte: new Date(todate) },
          },
        },
        {
          $group: {
            _id: null,
            totpushings: { $sum: "$total_pushings" },
          },
        },
      ]);*/
      if (!result.length) {
        return callback(
          new Error("No Total pushings found for the given date range")
        );
      }

      return callback(null, result[0].totpushings);
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  },

  pushingScheduleServiceExcel: async (
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
        return callback(new Error("Invalid shift. Use 'A', 'B' or 'C'."), null);
      }

      // ---------- normalize dates ----------

      // convert to exact UTC date (Mongo stored in UTC)
      const startDate = new Date(fromdate + "T00:00:00.000Z");
      const endDate = new Date(todate + "T00:00:00.000Z");

      // next day for inclusive query
      const nextDay = new Date(endDate);
      nextDay.setDate(nextDay.getDate() + 1);

      // wrap case (same day but A->C crossing)
      if (startDate.getTime() === endDate.getTime() && startIdx > endIdx) {
        endDate.setDate(endDate.getDate() + 1);
      }

      const shiftsFromStart = shiftOrder.slice(startIdx);
      const shiftsToEnd = shiftOrder.slice(0, endIdx + 1);
      const allShifts = shiftOrder;

      let matchCondition;

      if (startDate.getTime() === endDate.getTime()) {
        matchCondition = {
          date: {
            $gte: startDate,
            $lt: nextDay,
          },
          shift: { $in: shiftOrder.slice(startIdx, endIdx + 1) },
        };
      } else {
        matchCondition = {
          $or: [
            // start day
            {
              date: {
                $gte: startDate,
                $lt: new Date(startDate.getTime() + 86400000),
              },
              shift: { $in: shiftsFromStart },
            },

            // end day
            {
              date: {
                $gte: endDate,
                $lt: nextDay,
              },
              shift: { $in: shiftsToEnd },
            },

            // middle days
            {
              date: {
                $gt: startDate,
                $lt: endDate,
              },
              shift: { $in: allShifts },
            },
          ],
        };
      }

      // ----------- FETCH DATA -------------
      const data = await PushingSchedule.find(matchCondition)
        .sort({ date: 1, shift: 1 })
        .lean();

      if (!data.length) {
        return callback(new Error("No pushings found for given range"), null);
      }

      // ---------- format date + output ----------
      const formatted = data.map((item) => {
        const d = new Date(item.date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();

        return {
          date: `${day}-${month}-${year}`,
          shift: item.shift,
          bat1: item.bat1 || 0,
          bat2: item.bat2 || 0,
          bat3: item.bat3 || 0,
          bat4: item.bat4 || 0,
          bat5: item.bat5 || 0,
          total_pushings: item.total_pushings || 0,
        };
      });

      // -------- GROUP BY DATE ----------
      const groupedByDate = {};

      formatted.forEach((item) => {
        if (!groupedByDate[item.date]) {
          groupedByDate[item.date] = [];
        }
        groupedByDate[item.date].push(item);
      });

      // convert object → array format
      const finalOutput = Object.values(groupedByDate);

      return callback(null, finalOutput);
    } catch (error) {
      console.log(error);
      return callback(error, null);
    }
  },
};
