const {
  coalAnalysisController,
  coalAnalysisControllerRead,
  coalAnalysisControllerUpdate,
} = require("./coalanalysis.controller");

const coalAnalysisRouter = require("express").Router();

coalAnalysisRouter.post("/", coalAnalysisController);
coalAnalysisRouter.get("/", coalAnalysisControllerRead);
coalAnalysisRouter.put("/", coalAnalysisControllerUpdate);

module.exports = coalAnalysisRouter;
