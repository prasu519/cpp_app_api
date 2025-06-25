const {
  pushingScheduleController,
  pushingScheduleControllerRead,
  pushingScheduleControllerUpdate,
  pushingScheduleControllerDelete,
} = require("../pushingschedule/pushingschedule.controller");

const pushingscheduleRouter = require("express").Router();

pushingscheduleRouter.post("/", pushingScheduleController);
pushingscheduleRouter.get("/", pushingScheduleControllerRead);
pushingscheduleRouter.put("/", pushingScheduleControllerUpdate);
pushingscheduleRouter.delete("/", pushingScheduleControllerDelete);

module.exports = pushingscheduleRouter;
