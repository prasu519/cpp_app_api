const {
  feedingController,
  feedingControllerRead,
  feedingControllerUpdate,
} = require("./feeding.controller");

const feedingRouter = require("express").Router();

feedingRouter.post("/", feedingController);
feedingRouter.get("/", feedingControllerRead);
feedingRouter.put("/", feedingControllerUpdate);

module.exports = feedingRouter;
