const express = require("express");

const router = express.Router();

const instrumentationAreaController = require("../instrumentationarea/instrumentationarea.controller");

router.get(
  "/:equipmentType",
  instrumentationAreaController.getInstrumentationAreas
);

module.exports = router;
