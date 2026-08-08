const Complaint = require("../models/ComplaintModel");

const addComplaint = async (body) => {
  return await Complaint.create(body);
};

const updateComplaintStatus = async (id, status, updatedBy) => {
  return await Complaint.findByIdAndUpdate(
    id,
    { status, updatedBy },
    { new: true }
  );
};

const deleteComplaint = async (id) => {
  return await Complaint.findByIdAndDelete(id);
};

module.exports = {
  addComplaint,
  updateComplaintStatus,
  deleteComplaint,
};
