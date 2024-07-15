const {
  reclaimingController,
  reclaimingControllerRead,
  reclaimingControllerReadDaywise,
  reclaimingControllerUpdate,
} = require("./reclaiming.controller");

const reclaimingRouter = require("express").Router();

reclaimingRouter.post("/", reclaimingController);
reclaimingRouter.get("/", reclaimingControllerRead);
reclaimingRouter.get("/", reclaimingControllerReadDaywise);
reclaimingRouter.put("/", reclaimingControllerUpdate);

module.exports = reclaimingRouter;
