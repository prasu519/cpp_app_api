const Complaint = require("../models/ComplaintModel");

const getComplaintList = async (status, complaintType) => {
  const matchCondition = {
    complaintType,
  };

  // Apply status filter only if a status is provided
  if (status) {
    matchCondition.status = status;
  }

  return await Complaint.aggregate([
    {
      $match: matchCondition,
    },
    {
      $addFields: {
        shiftOrder: {
          $switch: {
            branches: [
              { case: { $eq: ["$shift", "C"] }, then: 3 },
              { case: { $eq: ["$shift", "B"] }, then: 2 },
              { case: { $eq: ["$shift", "A"] }, then: 1 },
            ],
            default: 0,
          },
        },
      },
    },
    {
      $sort: {
        date: -1,
        shiftOrder: -1,
      },
    },
    {
      $project: {
        date: 1,
        shift: 1,
        empNo: 1,
        name: 1,
        complaintType: 1,
        description: 1,
        stream: 1,
        equipment: 1,
        area: 1,
        status: 1,
      },
    },
  ]);
};

module.exports = {
  getComplaintList,
};
