const {
  reclaimingController,
  reclaimingControllerRead,
  reclaimingControllerReadDaywise,
  reclaimingControllerUpdate,
  reclaimingControllerDelete,
  reclaimingControllerTotRecl,
  reclaimingControllerByAllCoalNames,
  reclaimingControllerByAllCoalNamesCpp3,
  reclaimingControllerExcel,
} = require("./reclaiming.controller");

const reclaimingRouter = require("express").Router();

reclaimingRouter.post("/", reclaimingController);
reclaimingRouter.get("/", reclaimingControllerRead);
reclaimingRouter.put("/", reclaimingControllerUpdate);
reclaimingRouter.delete("/", reclaimingControllerDelete);
reclaimingRouter.get("/totrecl", reclaimingControllerTotRecl);
reclaimingRouter.get("/totByCoalNames", reclaimingControllerByAllCoalNames);
reclaimingRouter.get(
  "/totByCoalNamesCpp3",
  reclaimingControllerByAllCoalNamesCpp3
);
reclaimingRouter.get("/reclaiminginexcel", reclaimingControllerExcel);

module.exports = reclaimingRouter;
