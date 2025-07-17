const {
  feedingService,
  feedingServiceRead,
  feedingServiceUpdate,
  feedingServiceDelete,
  feedingServiceReadDaywise,
  feedingServiceTotalFeeding,
} = require("./feeding.service");

module.exports = {
  feedingController: async (req, res) => {
    const body = req.body;
    feedingService(body, (error, results) => {
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
    /* try {
      const body = req.body;
      const addFeeding = new Feeding(body);
      await addFeeding.save();
      res
        .status(200)
        .json({ message: "Posted Feeding successfully", feeding: addFeeding });
    } catch (error) {
      console.log("Error posting feeding data", error);
      res.status(500).json({ message: "Failed to post Fedding data" });
    }*/
  },

  feedingControllerRead: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;

    feedingServiceRead(date, shift, (error, results) => {
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

  feedingControllerReadDaywise: (req, res) => {
    const date = req.query.date;

    feedingServiceReadDaywise(date, (error, results) => {
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

  feedingControllerUpdate: (req, res) => {
    const data = req.body;
    feedingServiceUpdate(data, (error, results) => {
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
  feedingControllerDelete: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;
    feedingServiceDelete(date, shift, (error, results) => {
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
  feedingControllerTotalFeeding: (req, res) => {
    const fdate = req.query.fdate;
    const tdate = req.query.tdate;
    feedingServiceTotalFeeding(fdate, tdate, (error, results) => {
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
