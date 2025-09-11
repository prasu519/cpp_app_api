const {
  blendControllerPost,
  blendControllerGet,
  blendControllerPostCpp3,
} = require("../blend/blend.controller");

const blendRouter = require("express").Router();

blendRouter.post("/", blendControllerPost);
blendRouter.post("/cpp3", blendControllerPostCpp3);
blendRouter.get("/", blendControllerGet);

module.exports = blendRouter;
