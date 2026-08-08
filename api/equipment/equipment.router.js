const express = require("express");
const router = express.Router();

const equipmentController = require("../equipment/equipment.controller");

router.get("/:streamId", equipmentController.getEquipments);

module.exports = router;
