const {
  employeDetailsService,
  employeDetailsServiceRead,
} = require("../employedetails/employedetails.service");

module.exports = {
  employeDetailsController: (req, res) => {
    const body = req.body;
    employeDetailsService(body, (error, results) => {
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
  employeDetailsControllerRead: (req, res) => {
    const empnum = req.query.empnum;

    employeDetailsServiceRead(empnum, (error, results) => {
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
