const {
  mbtopstockController,
  mbtopstockControllerRead,
  mbtopstockControllerUpdate,
} = require("./mbtopstock.controller");

const mbtopstockRouter = require("express").Router();

mbtopstockRouter.post("/", mbtopstockController);
mbtopstockRouter.get("/", mbtopstockControllerRead);
mbtopstockRouter.put("/", mbtopstockControllerUpdate);

module.exports = mbtopstockRouter;
