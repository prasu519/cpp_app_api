const {
  pushingScheduleControllerReadDaywise,
} = require("./pushingschedule.controller");

const pushingScheduleRouter = require("express").Router();

pushingScheduleRouter.get("/", pushingScheduleControllerReadDaywise);

module.exports = pushingScheduleRouter;
