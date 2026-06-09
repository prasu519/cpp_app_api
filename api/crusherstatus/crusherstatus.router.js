const {
  crusherStatusController,
  crusherStatusControllerRead,
  crusherStatusControllerUpdate,
  crusherStatusControllerDelete,
  crusherStatusControllerFeedersTotal,
  crusherDetailsController,
} = require("../crusherstatus/crusherstatus.controller");

const crusherstatusRouter = require("express").Router();

crusherstatusRouter.post("/", crusherStatusController);
crusherstatusRouter.get("/", crusherStatusControllerRead);
crusherstatusRouter.put("/", crusherStatusControllerUpdate);
crusherstatusRouter.delete("/", crusherStatusControllerDelete);
crusherstatusRouter.get("/feedersTotal", crusherStatusControllerFeedersTotal);
crusherstatusRouter.post("/details", crusherDetailsController);

module.exports = crusherstatusRouter;
