const {
  reclaimingController,
  reclaimingControllerRead,
  reclaimingControllerReadDaywise,
  reclaimingControllerUpdate,
  reclaimingControllerDelete,
  reclaimingControllerTotRecl,
} = require("./reclaiming.controller");

const reclaimingRouter = require("express").Router();

reclaimingRouter.post("/", reclaimingController);
reclaimingRouter.get("/", reclaimingControllerRead);
reclaimingRouter.put("/", reclaimingControllerUpdate);
reclaimingRouter.delete("/", reclaimingControllerDelete);
reclaimingRouter.get("/totrecl", reclaimingControllerTotRecl);

module.exports = reclaimingRouter;
