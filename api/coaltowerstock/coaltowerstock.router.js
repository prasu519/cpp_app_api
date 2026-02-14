const {
  coaltowerstockController,
  coaltowerstockControllerRead,
  coaltowerstockControllerUpdate,
  coaltowerstockControllerDelete,
  coaltowerstocksCshiftControllerExcel,
} = require("./coaltowerstock.controller");

const coaltowerstockRouter = require("express").Router();

coaltowerstockRouter.post("/", coaltowerstockController);
coaltowerstockRouter.get("/", coaltowerstockControllerRead);
coaltowerstockRouter.put("/", coaltowerstockControllerUpdate);
coaltowerstockRouter.delete("/", coaltowerstockControllerDelete);
coaltowerstockRouter.get(
  "/coaltowerStocksCShiftexcel",
  coaltowerstocksCshiftControllerExcel
);

module.exports = coaltowerstockRouter;
