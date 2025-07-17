const {
  feedingController,
  feedingControllerRead,
  feedingControllerUpdate,
  feedingControllerDelete,
  feedingControllerReadDaywise,
  feedingControllerTotalFeeding,
} = require("./feeding.controller");

const feedingRouter = require("express").Router();

feedingRouter.post("/", feedingController);
feedingRouter.get("/", feedingControllerRead);
feedingRouter.put("/", feedingControllerUpdate);
feedingRouter.delete("/", feedingControllerDelete);
feedingRouter.get("/totfeeding", feedingControllerTotalFeeding);

module.exports = feedingRouter;
