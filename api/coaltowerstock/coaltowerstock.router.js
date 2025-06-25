const {
  coaltowerstockController,
  coaltowerstockControllerRead,
  coaltowerstockControllerUpdate,
  coaltowerstockControllerDelete,
} = require("./coaltowerstock.controller");

const coaltowerstockRouter = require("express").Router();

coaltowerstockRouter.post("/", coaltowerstockController);
coaltowerstockRouter.get("/", coaltowerstockControllerRead);
coaltowerstockRouter.put("/", coaltowerstockControllerUpdate);
coaltowerstockRouter.delete("/", coaltowerstockControllerDelete);

module.exports = coaltowerstockRouter;
