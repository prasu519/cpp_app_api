const {
  crusherStatusService,
  crusherStatusServiceRead,
  crusherStatusServiceUpdate,
  crusherStatusServiceDelete,
  crusherStatusServiceFeedersTotal,
} = require("../crusherstatus/crusherstatus.service");

module.exports = {
  crusherStatusController: (req, res) => {
    const body = req.body;
    crusherStatusService(body, (error, results) => {
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

  crusherStatusControllerRead: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;

    crusherStatusServiceRead(date, shift, (error, results) => {
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

  crusherStatusControllerUpdate: (req, res) => {
    const data = req.body;
    crusherStatusServiceUpdate(data, (error, results) => {
      if (error) {
        console.log(error);
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
  crusherStatusControllerDelete: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;
    crusherStatusServiceDelete(date, shift, (error, results) => {
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
  crusherStatusControllerFeedersTotal: (req, res) => {
    const fdate = req.query.fdate;
    const tdate = req.query.tdate;
    crusherStatusServiceFeedersTotal(fdate, tdate, (error, results) => {
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
