const {
  runningHoursControllerReadDaywise,
} = require("./runninghours.controller");
const runningHoursDaywiseRouter = require("express").Router();

runningHoursDaywiseRouter.get("/", runningHoursControllerReadDaywise);

module.exports = runningHoursDaywiseRouter;
