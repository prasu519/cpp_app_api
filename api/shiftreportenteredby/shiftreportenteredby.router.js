const {
  shiftReportEnteredByController,
  shiftReportEnteredByControllerRead,
} = require("../shiftreportenteredby/shiftreportenteredby.controller");

const shiftReportEnteredByRouter = require("express").Router();

shiftReportEnteredByRouter.post("/", shiftReportEnteredByController);
shiftReportEnteredByRouter.get("/", shiftReportEnteredByControllerRead);

module.exports = shiftReportEnteredByRouter;
