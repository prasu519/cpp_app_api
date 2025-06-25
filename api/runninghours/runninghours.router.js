const {
  runningHoursController,
  runningHoursControllerRead,
  runningHoursControllerUpdate,
  runningHoursControllerDelete,
} = require("./runninghours.controller");

const runningHoursRouter = require("express").Router();

runningHoursRouter.post("/", runningHoursController);
runningHoursRouter.get("/", runningHoursControllerRead);
runningHoursRouter.put("/", runningHoursControllerUpdate);
runningHoursRouter.delete("/", runningHoursControllerDelete);

module.exports = runningHoursRouter;
