const {
  coalAnalysisController,
  coalAnalysisControllerRead,
  coalAnalysisControllerUpdate,
  coalAnalysisControllerDelete,
  coalAnalysisControllerAvgCI,
} = require("./coalanalysis.controller");

const coalAnalysisRouter = require("express").Router();

coalAnalysisRouter.post("/", coalAnalysisController);
coalAnalysisRouter.get("/", coalAnalysisControllerRead);
coalAnalysisRouter.put("/", coalAnalysisControllerUpdate);
coalAnalysisRouter.delete("/", coalAnalysisControllerDelete);
coalAnalysisRouter.get("/avgci", coalAnalysisControllerAvgCI);

module.exports = coalAnalysisRouter;
