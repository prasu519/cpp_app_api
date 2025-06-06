const {
  crusherStatusController,
  crusherStatusControllerRead,
  crusherStatusControllerUpdate,
} = require("../crusherstatus/crusherstatus.controller");

const crusherstatusRouter = require("express").Router();

crusherstatusRouter.post("/", crusherStatusController);
crusherstatusRouter.get("/", crusherStatusControllerRead);
crusherstatusRouter.put("/", crusherStatusControllerUpdate);

module.exports = crusherstatusRouter;
