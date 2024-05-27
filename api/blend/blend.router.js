const {
  blendControllerPost,
  blendControllerGet,
} = require("../blend/blend.controller");

const blendRouter = require("express").Router();

blendRouter.post("/", blendControllerPost);
blendRouter.get("/", blendControllerGet);

module.exports = blendRouter;
