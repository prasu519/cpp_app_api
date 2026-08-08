const express = require("express");

const router = express.Router();

const electricalAreaController = require("../electricalarea/electricalarea.controller");

router.get("/:equipmentType", electricalAreaController.getElectricalAreas);

module.exports = router;
