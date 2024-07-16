const { blendControllerGetDatewise } = require("../blend/blend.controller");

const blendRouterDatewise = require("express").Router();

blendRouterDatewise.get("/", blendControllerGetDatewise);

module.exports = blendRouterDatewise;
