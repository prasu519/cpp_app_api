const express = require("express");

const router = express.Router();

const complaintController = require("../complaint/complaint.controller");

const upload = require("../middleware/Upload");

// Add complaint + image
router.post(
  "/",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "voice", maxCount: 1 },
  ]),
  complaintController.addComplaint
);

// Update complaint status
router.put("/:id", complaintController.updateComplaintStatus);

// Delete complaint
router.delete("/:id", complaintController.deleteComplaint);

module.exports = router;

/*const express = require("express");

const router = express.Router();

const complaintController = require("../complaint/complaint.controller");

router.post("/", complaintController.addComplaint);

router.put("/:id", complaintController.updateComplaintStatus);

router.delete("/:id", complaintController.deleteComplaint);

module.exports = router;*/
