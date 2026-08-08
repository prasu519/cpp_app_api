const express = require("express");

const router = express.Router();

const mechanicalAreaController = require("../mechanicalarea/mechanicalarea.controller");

router.get("/:equipmentType", mechanicalAreaController.getMechanicalAreas);

module.exports = router;
