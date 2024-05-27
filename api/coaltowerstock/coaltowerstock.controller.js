const {
  coaltowerstockService,
  coaltowerstockServiceRead,
  coaltowerstockServiceUpdate,
} = require("./coaltowerstock.service");

module.exports = {
  coaltowerstockController: (req, res) => {
    const data = req.body;
    coaltowerstockService(data, (err, results) => {
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

  coaltowerstockControllerRead: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;
    coaltowerstockServiceRead(date, shift, (err, results) => {
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

  coaltowerstockControllerUpdate: (req, res) => {
    const data = req.body;
    coaltowerstockServiceUpdate(data, (err, results) => {
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
};
