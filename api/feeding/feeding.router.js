const {
  feedingController,
  feedingControllerRead,
  feedingControllerUpdate,
  feedingControllerDelete,
  feedingControllerReadDaywise,
} = require("./feeding.controller");

const feedingRouter = require("express").Router();

feedingRouter.post("/", feedingController);
feedingRouter.get("/", feedingControllerRead);
feedingRouter.put("/", feedingControllerUpdate);
feedingRouter.delete("/", feedingControllerDelete);

module.exports = feedingRouter;
