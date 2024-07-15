const { reclaimingControllerReadDaywise } = require("./reclaiming.controller");

const reclaimingRouter = require("express").Router();

reclaimingRouter.get("/", reclaimingControllerReadDaywise);

module.exports = reclaimingRouter;
