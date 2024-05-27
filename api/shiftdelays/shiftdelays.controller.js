const {
  shiftDelayService,
  shiftDelayServiceRead,
  shiftDelayServiceUpdate,
  shiftDelayServiceDelete,
} = require("./shiftdelays.service");

module.exports = {
  shiftDelayController: (req, res) => {
    const body = req.body;
    shiftDelayService(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  shiftDelayControllerRead: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;

    shiftDelayServiceRead(date, shift, (error, results) => {
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

  shiftDelayControllerUpdate: (req, res) => {
    const data = req.body;
    shiftDelayServiceUpdate(data, (error, results) => {
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

  shiftDelayControllerDelete: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;
    const delaynumber = req.query.delayNumber;

    shiftDelayServiceDelete(date, shift, delaynumber, (error, results) => {
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
