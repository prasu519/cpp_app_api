const {
  feedingController,
  feedingControllerRead,
  feedingControllerUpdate,
  feedingControllerDelete,
  feedingControllerReadDaywise,
  feedingControllerTotalFeeding,
  feedingControllerExcel,
  feedingControllerForPushingsExcel,
} = require("./feeding.controller");

const feedingRouter = require("express").Router();

feedingRouter.post("/", feedingController);
feedingRouter.get("/", feedingControllerRead);
feedingRouter.put("/", feedingControllerUpdate);
feedingRouter.delete("/", feedingControllerDelete);
feedingRouter.get("/totfeeding", feedingControllerTotalFeeding);
feedingRouter.get("/feedinginexcel", feedingControllerExcel);
feedingRouter.get("/feedingforpushingexcel", feedingControllerForPushingsExcel);

module.exports = feedingRouter;
