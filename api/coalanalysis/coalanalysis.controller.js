const {
  coalAnalysisService,
  coalAnalysisServiceRead,
  coalAnalysisServiceUpdate,
  coalAnalysisServiceDelete,
  coalAnalysisServiceAvgCI,
} = require("./coalanalysis.service");

module.exports = {
  coalAnalysisController: (req, res) => {
    const body = req.body;

    coalAnalysisService(body, (error, results) => {
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

  coalAnalysisControllerRead: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;

    coalAnalysisServiceRead(date, shift, (error, results) => {
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

  coalAnalysisControllerUpdate: (req, res) => {
    const data = req.body;
    coalAnalysisServiceUpdate(data, (error, results) => {
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
  coalAnalysisControllerDelete: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;
    coalAnalysisServiceDelete(date, shift, (error, results) => {
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
  coalAnalysisControllerAvgCI: (req, res) => {
    const fromdate = req.query.fromdate;
    const todate = req.query.todate;

    coalAnalysisServiceAvgCI(fromdate, todate, (error, results) => {
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
