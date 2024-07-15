const { blendServicePost, blendServiceGet } = require("../blend/blend.service");

module.exports = {
  blendControllerPost: (req, res) => {
    const data = req.body;

    blendServicePost(data, (error, results) => {
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
  blendControllerGet: (req, res) => {
    const selectedDate = req.query.date;
    const selectedShift = req.query.shift;
    blendServiceGet(selectedDate, selectedShift, (error, results) => {
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
