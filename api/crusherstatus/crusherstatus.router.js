const {
  crusherStatusController,
  crusherStatusControllerRead,
  crusherStatusControllerUpdate,
  crusherStatusControllerDelete,
  crusherStatusControllerFeedersTotal,
} = require("../crusherstatus/crusherstatus.controller");

const crusherstatusRouter = require("express").Router();

crusherstatusRouter.post("/", crusherStatusController);
crusherstatusRouter.get("/", crusherStatusControllerRead);
crusherstatusRouter.put("/", crusherStatusControllerUpdate);
crusherstatusRouter.delete("/", crusherStatusControllerDelete);
crusherstatusRouter.get("/feedersTotal", crusherStatusControllerFeedersTotal);

module.exports = crusherstatusRouter;
