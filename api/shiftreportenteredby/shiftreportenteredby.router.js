const {
  shiftReportEnteredByController,
  shiftReportEnteredByControllerRead,
  shiftReportEnteredByControllerDelete,
} = require("../shiftreportenteredby/shiftreportenteredby.controller");

const shiftReportEnteredByRouter = require("express").Router();

shiftReportEnteredByRouter.post("/", shiftReportEnteredByController);
shiftReportEnteredByRouter.get("/", shiftReportEnteredByControllerRead);
shiftReportEnteredByRouter.delete("/", shiftReportEnteredByControllerDelete);

module.exports = shiftReportEnteredByRouter;
