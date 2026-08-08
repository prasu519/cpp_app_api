const express = require("express");

const router = express.Router();

const ComplaintListController = require("./complaintslist.controller");
//router.get("/:status/:complaintType", ComplaintListController.getComplaintList);
router.get("/:complaintType", ComplaintListController.getComplaintList);

module.exports = router;
