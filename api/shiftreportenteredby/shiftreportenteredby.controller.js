const {
  shiftReportEnteredByService,
  shiftReportEnteredByRead,
  shiftReportEnteredByLatest,
  shiftReportEnteredByDelete,
  shiftReportEnteredByUpdate,
} = require("../shiftreportenteredby/shiftreportenteredby.service");

module.exports = {
  shiftReportEnteredByController: (req, res) => {
    const body = req.body;
    shiftReportEnteredByService(body, (error, results) => {
      if (error)
        return res.status(500).json({
          success: 0,
          message: error,
        });

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  shiftReportEnteredByControllerRead: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;
    shiftReportEnteredByRead(date, shift, (error, results) => {
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
  shiftReportEnteredByControllerLatest: (req, res) => {
    shiftReportEnteredByLatest((error, results) => {
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
  shiftReportEnteredByControllerUpdate: (req, res) => {
    const data = req.body;
    shiftReportEnteredByUpdate(data, (error, results) => {
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
  shiftReportEnteredByControllerDelete: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;
    shiftReportEnteredByDelete(date, shift, (error, results) => {
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
