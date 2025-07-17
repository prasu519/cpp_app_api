const {
  pushingScheduleController,
  pushingScheduleControllerRead,
  pushingScheduleControllerUpdate,
  pushingScheduleControllerDelete,
  pushingScheduleControllerTotPushings,
} = require("../pushingschedule/pushingschedule.controller");

const pushingscheduleRouter = require("express").Router();

pushingscheduleRouter.post("/", pushingScheduleController);
pushingscheduleRouter.get("/", pushingScheduleControllerRead);
pushingscheduleRouter.put("/", pushingScheduleControllerUpdate);
pushingscheduleRouter.delete("/", pushingScheduleControllerDelete);
pushingscheduleRouter.get("/totpush", pushingScheduleControllerTotPushings);

module.exports = pushingscheduleRouter;
