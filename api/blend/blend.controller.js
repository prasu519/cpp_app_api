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
    const date = req.query.date;
    const shift = req.query.shift;
    blendServiceGet(date, shift, (error, results) => {
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
