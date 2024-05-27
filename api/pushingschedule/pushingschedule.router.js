const {
  pushingScheduleController,
  pushingScheduleControllerRead,
  pushingScheduleControllerUpdate,
} = require("../pushingschedule/pushingschedule.controller");

const pushingscheduleRouter = require("express").Router();

pushingscheduleRouter.post("/", pushingScheduleController);
pushingscheduleRouter.get("/", pushingScheduleControllerRead);
pushingscheduleRouter.put("/", pushingScheduleControllerUpdate);

module.exports = pushingscheduleRouter;
