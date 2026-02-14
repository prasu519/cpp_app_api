const {
  reclaimingService,
  reclaimingServiceRead,
  reclaimingServiceReadDaywise,
  reclaimingServiceUpdate,
  reclaimingServiceDelete,
  reclaimingServiceTotalRecl,
  getTotalReclaimingByAllCoalNames,
  getTotalReclaimingByAllCoalNamesCpp3,
  reclaimingServiceExcel,
} = require("./reclaiming.service");

module.exports = {
  reclaimingController: (req, res) => {
    const body = req.body;

    reclaimingService(body, (err, results) => {
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
  reclaimingControllerRead: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;

    reclaimingServiceRead(date, shift, (error, results) => {
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

  reclaimingControllerReadDaywise: (req, res) => {
    const date = req.query.date;
    reclaimingServiceReadDaywise(date, (error, results) => {
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

  reclaimingControllerUpdate: (req, res) => {
    const data = req.body;
    reclaimingServiceUpdate(data, (error, results) => {
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
  reclaimingControllerDelete: (req, res) => {
    const date = req.query.date;
    const shift = req.query.shift;
    reclaimingServiceDelete(date, shift, (error, results) => {
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
  reclaimingControllerTotRecl: (req, res) => {
    const fdate = req.query.fdate;
    const fshift = req.query.fshift;
    const tdate = req.query.tdate;
    const tshift = req.query.tshift;
    reclaimingServiceTotalRecl(
      fdate,
      fshift,
      tdate,
      tshift,
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
  reclaimingControllerByAllCoalNames: (req, res) => {
    const fdate = req.query.fdate;
    const fshift = req.query.fshift;
    const tdate = req.query.tdate;
    const tshift = req.query.tshift;

    getTotalReclaimingByAllCoalNames(
      fdate,
      fshift,
      tdate,
      tshift,
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
  reclaimingControllerByAllCoalNamesCpp3: (req, res) => {
    const fdate = req.query.fdate;
    const tdate = req.query.tdate;
    const fshift = req.query.fshift;
    const tshift = req.query.tshift;
    getTotalReclaimingByAllCoalNamesCpp3(
      fdate,
      fshift,
      tdate,
      tshift,
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
  reclaimingControllerExcel: (req, res) => {
    const fdate = req.query.fdate;
    const fshift = req.query.fshift;
    const tdate = req.query.tdate;
    const tshift = req.query.tshift;

    if (!fdate || !fshift || !tdate || !tshift) {
      return res.status(400).json({
        success: 0,
        message: "fdate,fshift,tdate,tshift required",
      });
    }

    reclaimingServiceExcel(fdate, fshift, tdate, tshift, (err, filePath) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }

      return res.download(filePath);
    });
  },
};
