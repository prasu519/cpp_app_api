const {
  shiftDelayController,
  shiftDelayControllerRead,
  shiftDelayControllerUpdate,
  shiftDelayControllerDelete,
} = require("./shiftdelays.controller");

const shiftDelayRouter = require("express").Router();

shiftDelayRouter.post("/", shiftDelayController);
shiftDelayRouter.get("/", shiftDelayControllerRead);
shiftDelayRouter.put("/", shiftDelayControllerUpdate);
shiftDelayRouter.delete("/", shiftDelayControllerDelete);

module.exports = shiftDelayRouter;
