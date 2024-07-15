const {
  feedingController,
  feedingControllerRead,
  feedingControllerUpdate,
  feedingControllerReadDaywise,
} = require("./feeding.controller");

const feedingRouter = require("express").Router();

feedingRouter.post("/", feedingController);
feedingRouter.get("/", feedingControllerRead);
feedingRouter.get("/", feedingControllerReadDaywise);
feedingRouter.put("/", feedingControllerUpdate);

module.exports = feedingRouter;
