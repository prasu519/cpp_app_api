const ShiftReportEnteredBy = require("../models/ShiftReportEnteredBy");

module.exports = {
  shiftReportEnteredByService: async (data, callback) => {
    try {
      const addShiftReportEnteredBy = new ShiftReportEnteredBy(data);
      await addShiftReportEnteredBy.save();
      return callback(null, addShiftReportEnteredBy);
    } catch (error) {
      return callback(error);
    }
  },
  shiftReportEnteredByRead: async (date, shift, callback) => {
    try {
      const getShiftReportEnteredBy = await ShiftReportEnteredBy.find({
        date: date,
        shift: shift,
      });
      return callback(null, getShiftReportEnteredBy);
    } catch (error) {
      return callback(error);
    }
  },
  shiftReportEnteredByLatest: async (callback) => {
    try {
      const getLatestShiftReport = await ShiftReportEnteredBy.findOne().sort({
        date: -1,
        shift: -1,
      });

      return callback(null, getLatestShiftReport);
    } catch (error) {
      return console.log(error);
    }
  },
  shiftReportEnteredByDelete: async (date, shift, callback) => {
    console.log("date&shift: ", date, shift);
    try {
      const deleted = await ShiftReportEnteredBy.deleteOne({
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
