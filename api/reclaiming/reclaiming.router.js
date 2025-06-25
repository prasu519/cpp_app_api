const {
  reclaimingController,
  reclaimingControllerRead,
  reclaimingControllerReadDaywise,
  reclaimingControllerUpdate,
  reclaimingControllerDelete,
} = require("./reclaiming.controller");

const reclaimingRouter = require("express").Router();

reclaimingRouter.post("/", reclaimingController);
reclaimingRouter.get("/", reclaimingControllerRead);
reclaimingRouter.put("/", reclaimingControllerUpdate);
reclaimingRouter.delete("/", reclaimingControllerDelete);

module.exports = reclaimingRouter;
