const {
  runningHoursService,
  runningHoursServiceRead,
  runningHoursServiceReadDaywise,
  runningHoursServiceUpdate,
  runningHoursServiceDelete,
} = require("./runninghours.service");

module.exports = {
  runningHoursController: (req, res) => {
    const body = req.body;
    runningHoursService(body, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: error,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  runningHoursControllerRead: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;
    runningHoursServiceRead(date, shift, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: error,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  runningHoursControllerReadDaywise: (req, res) => {
    const date = req.query.date;
    runningHoursServiceReadDaywise(date, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: error,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  runningHoursControllerUpdate: (req, res) => {
    const data = req.body;
    runningHoursServiceUpdate(data, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: error,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  runningHoursControllerDelete: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;
    runningHoursServiceDelete(date, shift, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: error,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
