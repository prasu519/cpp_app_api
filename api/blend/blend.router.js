const {
  blendControllerPost,
  blendControllerGet,
  blendControllerPostCpp3,
  blendControllerGetCpp3,
} = require("../blend/blend.controller");

const blendRouter = require("express").Router();

blendRouter.post("/", blendControllerPost);
blendRouter.post("/cpp3", blendControllerPostCpp3);
blendRouter.get("/", blendControllerGet);
blendRouter.get("/cpp3", blendControllerGetCpp3);

module.exports = blendRouter;
