const {
  crusherStatusController,
  crusherStatusControllerRead,
  crusherStatusControllerUpdate,
  crusherStatusControllerDelete,
} = require("../crusherstatus/crusherstatus.controller");

const crusherstatusRouter = require("express").Router();

crusherstatusRouter.post("/", crusherStatusController);
crusherstatusRouter.get("/", crusherStatusControllerRead);
crusherstatusRouter.put("/", crusherStatusControllerUpdate);
crusherstatusRouter.delete("/", crusherStatusControllerDelete);

module.exports = crusherstatusRouter;
