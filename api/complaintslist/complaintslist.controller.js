const complaintListService = require("./complaintslist.service");

/*const getComplaintList = async (req, res) => {
  try {
    const { status, complaintType } = req.params;

    const data = await complaintService.getComplaintList(status, complaintType);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};*/

const getComplaintList = async (req, res) => {
  try {
    const { complaintType } = req.params;
    const { status } = req.query;

    const complaints = await complaintListService.getComplaintList(
      status,
      complaintType
    );

    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getComplaintList,
};
