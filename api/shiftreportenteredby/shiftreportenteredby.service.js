const ShiftReportEnteredBy = require("../models/ShiftReportEnteredBy");

module.exports = {
  shiftReportEnteredByService: async (data, callback) => {
    try {
      const addShiftReportEnteredBy = new ShiftReportEnteredBy(data);
      await addShiftReportEnteredBy.save();
      return callback(null, addShiftReportEnteredBy);
    } catch (error) {
      console.log("Error posting ShiftReportEnteredBy data", error);
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
      console.log(
        "getShiftReportEnteredBy Record not found for date: " +
          date +
          "shift: " +
          shift
      );
      return callback(error);
    }
  },
};
