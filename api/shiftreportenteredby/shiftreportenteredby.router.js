const {
  shiftReportEnteredByController,
  shiftReportEnteredByControllerRead,
  shiftReportEnteredByControllerDelete,
  shiftReportEnteredByControllerUpdate,
} = require("../shiftreportenteredby/shiftreportenteredby.controller");

const shiftReportEnteredByRouter = require("express").Router();

shiftReportEnteredByRouter.post("/", shiftReportEnteredByController);
shiftReportEnteredByRouter.get("/", shiftReportEnteredByControllerRead);
shiftReportEnteredByRouter.delete("/", shiftReportEnteredByControllerDelete);
shiftReportEnteredByRouter.put("/", shiftReportEnteredByControllerUpdate);

module.exports = shiftReportEnteredByRouter;
