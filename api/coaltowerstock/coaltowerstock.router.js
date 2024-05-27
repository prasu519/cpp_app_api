const {
  coaltowerstockController,
  coaltowerstockControllerRead,
  coaltowerstockControllerUpdate,
} = require("./coaltowerstock.controller");

const coaltowerstockRouter = require("express").Router();

coaltowerstockRouter.post("/", coaltowerstockController);
coaltowerstockRouter.get("/", coaltowerstockControllerRead);
coaltowerstockRouter.put("/", coaltowerstockControllerUpdate);

module.exports = coaltowerstockRouter;
