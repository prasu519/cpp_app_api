const {
  coalNameListController,
} = require("../coalnamelist/coalnamelist.controller");
const coalNameListRouter = require("express").Router();
coalNameListRouter.get("/", coalNameListController);

module.exports = coalNameListRouter;
