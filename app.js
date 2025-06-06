const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MONGO_URL = process.env.URL;
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log("Error Connecting to mongodb: " + error);
  });
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server up and running");
});

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    msg: "Node Server Running",
  });
});
const blendRouter = require("./api/blend/blend.router");
app.use("/api/blend", blendRouter);

const blendRouterDatewise = require("./api/blend/blend.router.datewise");
app.use("/api/blend/datewise", blendRouterDatewise);

const reclaimingRouter = require("./api/reclaiming/reclaiming.router");
app.use("/api/reclaiming", reclaimingRouter);

const reclaimingRouterDaywise = require("./api/reclaiming/reclaiming.router.daywise");
app.use("/api/reclaiming/daywise", reclaimingRouterDaywise);

const feedingRouter = require("./api/feeding/feeding.router");
app.use("/api/feeding", feedingRouter);

const feedingRouterDaywise = require("./api/feeding/feeding.router.daywise");
app.use("/api/feeding/daywise", feedingRouterDaywise);

const runningHoursRouter = require("./api/runninghours/runninghours.router");
app.use("/api/runningHours", runningHoursRouter);

const shiftDelayRouter = require("./api/shiftdelays/shiftdelays.router");
app.use("/api/shiftDelay", shiftDelayRouter);

const mbtopstockRouter = require("./api/mbtopstock/mbtopstock.router");
app.use("/api/mbtopStock", mbtopstockRouter);

const coaltowerstockRouter = require("./api/coaltowerstock/coaltowerstock.router");
app.use("/api/coaltowerstock", coaltowerstockRouter);

const coalAnalysisRouter = require("./api/coalanalysis/coalanalysis.router");
app.use("/api/coalAnalysis", coalAnalysisRouter);

const pushingScheduleRouter = require("./api/pushingschedule/pushingschedule.router");
app.use("/api/pushings", pushingScheduleRouter);

const crusherStatusRouter = require("./api/crusherstatus/crusherstatus.router");
app.use("/api/crusher", crusherStatusRouter);

const pushingScheduleRouterDaywise = require("./api/pushingschedule/pushingschedule.router.daywise");
app.use("/api/pushings/daywise", pushingScheduleRouterDaywise);

const employeDetailsRouter = require("./api/employedetails/employedetails.router");
app.use("/api/employedetails", employeDetailsRouter);

const shiftReportEnteredByRouter = require("./api/shiftreportenteredby/shiftreportenteredby.router");
app.use("/api/shiftreportenteredby", shiftReportEnteredByRouter);

const shiftReportEnteredByRouterLatest = require("./api/shiftreportenteredby/shiftreportenteredbylatest.router");
app.use("/api/shiftreportenteredbylatest", shiftReportEnteredByRouterLatest);
