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
      console.log(getShiftReportEnteredBy);
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

      console.log(getLatestShiftReport);
      return callback(null, getLatestShiftReport);
    } catch (error) {
      return console.log(error);
    }
  },
};
