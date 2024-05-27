const {
  runningHoursController,
  runningHoursControllerRead,
  runningHoursControllerUpdate,
} = require("./runninghours.controller");

const runningHoursRouter = require("express").Router();

runningHoursRouter.post("/", runningHoursController);
runningHoursRouter.get("/", runningHoursControllerRead);
runningHoursRouter.put("/", runningHoursControllerUpdate);

module.exports = runningHoursRouter;
