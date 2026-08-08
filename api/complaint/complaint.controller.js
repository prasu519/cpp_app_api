const complaintService = require("../complaint/complaint.service");

const addComplaint = async (req, res) => {
  try {
    const complaint = await complaintService.addComplaint(req.body);

    res.status(201).json({
      success: true,
      message: "Complaint Added Successfully",
      complaint,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await complaintService.updateComplaintStatus(
      req.params.id,
      req.body.status,
      req.body.updatedby
    );

    res.json(complaint);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await complaintService.deleteComplaint(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addComplaint,
  updateComplaintStatus,
  deleteComplaint,
};
