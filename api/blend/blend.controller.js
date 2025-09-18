const {
  blendServicePost,
  blendServiceGet,
  blendServiceGetCpp3,
  blendServiceGetDatewise,
  blendServiceGetDatewiseCpp3,
  blendServicePostCpp3,
} = require("../blend/blend.service");

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

  blendControllerPostCpp3: (req, res) => {
    const data = req.body;
    blendServicePostCpp3(data, (error, results) => {
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

  blendControllerGetCpp3: (req, res) => {
    const selectedDate = req.query.date;
    const selectedShift = req.query.shift;
    blendServiceGetCpp3(selectedDate, selectedShift, (error, results) => {
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

  blendControllerGetDatewise: (req, res) => {
    const selectedFromDate = req.query.fromdate;
    const selectedToDate = req.query.todate;
    blendServiceGetDatewise(
      selectedFromDate,
      selectedToDate,
      (error, results) => {
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
      }
    );
  },

  blendControllerGetDatewiseCpp3: (req, res) => {
    const selectedFromDate = req.query.fromdate;
    const selectedToDate = req.query.todate;
    blendServiceGetDatewiseCpp3(
      selectedFromDate,
      selectedToDate,
      (error, results) => {
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
      }
    );
  },
};
