const {
  pushingScheduleService,
  pushingScheduleServiceRead,
  pushingScheduleServiceUpdate,
  pushingScheduleServiceDelete,
  pushingScheduleServiceReadDaywise,
  reclaimingServiceTotPushings,
} = require("../pushingschedule/pushingschedule.service");

module.exports = {
  pushingScheduleController: (req, res) => {
    const body = req.body;
    pushingScheduleService(body, (error, results) => {
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

  pushingScheduleControllerRead: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;

    pushingScheduleServiceRead(date, shift, (error, results) => {
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

  pushingScheduleControllerReadDaywise: (req, res) => {
    const date = req.query.date;

    pushingScheduleServiceReadDaywise(date, (error, results) => {
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

  pushingScheduleControllerUpdate: (req, res) => {
    const data = req.body;
    pushingScheduleServiceUpdate(data, (error, results) => {
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
  pushingScheduleControllerDelete: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;
    pushingScheduleServiceDelete(date, shift, (error, results) => {
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
  pushingScheduleControllerTotPushings: (req, res) => {
    const fdate = req.query.fromdate;
    const tdate = req.query.todate;
    reclaimingServiceTotPushings(fdate, tdate, (error, results) => {
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
