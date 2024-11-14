const {
  shiftReportEnteredByControllerLatest,
} = require("../shiftreportenteredby/shiftreportenteredby.controller");

const shiftReportEnteredByLatestRouter = require("express").Router();

shiftReportEnteredByLatestRouter.get("/", shiftReportEnteredByControllerLatest);

module.exports = shiftReportEnteredByLatestRouter;
