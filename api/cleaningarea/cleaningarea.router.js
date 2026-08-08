const express = require("express");

const router = express.Router();

const cleaningAreaController = require("../cleaningarea/cleaningarea.controller");

router.get("/:equipmentType", cleaningAreaController.getCleaningAreas);

module.exports = router;
