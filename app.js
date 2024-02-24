const express = require("express");
const app = express();
const reclaimingRouter = require("./api/reclaiming/reclaiming.router");

app.use(express.json());
app.use("/api/reclaiming", reclaimingRouter);

app.listen(3000, () => {
  console.log("Server up and running");
});
