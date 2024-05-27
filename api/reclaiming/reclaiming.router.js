const {
  reclaimingController,
  reclaimingControllerRead,
  reclaimingControllerUpdate,
} = require("./reclaiming.controller");

const reclaimingRouter = require("express").Router();

reclaimingRouter.post("/", reclaimingController);
reclaimingRouter.get("/", reclaimingControllerRead);
reclaimingRouter.put("/", reclaimingControllerUpdate);

module.exports = reclaimingRouter;
