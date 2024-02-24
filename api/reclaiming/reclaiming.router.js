const { reclaimingController } = require("./reclaiming.controller");
const reclaimingRouter = require("express").Router();

reclaimingRouter.post("/", reclaimingController);

module.exports = reclaimingRouter;
