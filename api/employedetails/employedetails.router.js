const {
  employeDetailsController,
  employeDetailsControllerRead,
} = require("../employedetails/employedetails.controller");

const employeDetailsRouter = require("express").Router();

employeDetailsRouter.post("/", employeDetailsController);
employeDetailsRouter.get("/", employeDetailsControllerRead);

module.exports = employeDetailsRouter;
