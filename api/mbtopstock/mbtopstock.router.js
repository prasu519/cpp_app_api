const {
  mbtopstockController,
  mbtopstockControllerRead,
  mbtopstockControllerUpdate,
  mbtopstockControllerDelete,
} = require("./mbtopstock.controller");

const mbtopstockRouter = require("express").Router();

mbtopstockRouter.post("/", mbtopstockController);
mbtopstockRouter.get("/", mbtopstockControllerRead);
mbtopstockRouter.put("/", mbtopstockControllerUpdate);
mbtopstockRouter.delete("/", mbtopstockControllerDelete);

module.exports = mbtopstockRouter;
