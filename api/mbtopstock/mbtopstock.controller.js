const {
  mbtopstockService,
  mbtopstockServiceRead,
  mbtopstockServiceUpdate,
  mbtopstockServiceDelete,
} = require("./mbtopstock.service");

module.exports = {
  mbtopstockController: (req, res) => {
    const body = req.body;

    mbtopstockService(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err,
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },
  mbtopstockControllerRead: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;

    mbtopstockServiceRead(date, shift, (error, results) => {
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
  mbtopstockControllerUpdate: (req, res) => {
    const data = req.body;
    mbtopstockServiceUpdate(data, (error, results) => {
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
  mbtopstockControllerDelete: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;
    mbtopstockServiceDelete(date, shift, (error, results) => {
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
