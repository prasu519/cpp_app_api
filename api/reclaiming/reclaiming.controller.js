const { reclaimingService } = require("./reclaiming.service");
const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
  reclaimingController: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    //body.password = hashSync(body.password, salt);

    reclaimingService(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
