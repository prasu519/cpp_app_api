const {
  blendControllerGetDatewise,
  blendControllerGetDatewiseCpp3,
} = require("../blend/blend.controller");

const blendRouterDatewise = require("express").Router();

blendRouterDatewise.get("/", blendControllerGetDatewise);
blendRouterDatewise.get("/cpp3", blendControllerGetDatewiseCpp3);

module.exports = blendRouterDatewise;
