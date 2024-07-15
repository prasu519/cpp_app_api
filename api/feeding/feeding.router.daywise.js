const { feedingControllerReadDaywise } = require("./feeding.controller");

const feedingRouter = require("express").Router();

feedingRouter.get("/", feedingControllerReadDaywise);

module.exports = feedingRouter;
