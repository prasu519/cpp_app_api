const express = require("express");

const router = express.Router();

const complaintController = require("../complaint/complaint.controller");

router.post("/", complaintController.addComplaint);

router.put("/:id", complaintController.updateComplaintStatus);

router.delete("/:id", complaintController.deleteComplaint);

module.exports = router;
