const {
  coalAnalysisController,
  coalAnalysisControllerRead,
  coalAnalysisControllerUpdate,
  coalAnalysisControllerDelete,
} = require("./coalanalysis.controller");

const coalAnalysisRouter = require("express").Router();

coalAnalysisRouter.post("/", coalAnalysisController);
coalAnalysisRouter.get("/", coalAnalysisControllerRead);
coalAnalysisRouter.put("/", coalAnalysisControllerUpdate);
coalAnalysisRouter.delete("/", coalAnalysisControllerDelete);

module.exports = coalAnalysisRouter;
