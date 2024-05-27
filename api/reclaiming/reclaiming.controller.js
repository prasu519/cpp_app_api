const {
  reclaimingService,
  reclaimingServiceRead,
  reclaimingServiceUpdate,
} = require("./reclaiming.service");
const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
  reclaimingController: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    //body.password = hashSync(body.password, salt);

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
};
