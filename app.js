const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://chengalaprasanna:04131Aa0519@cluster0.fzce8q3.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log("Error Connecting to mongodb: " + error);
  });

app.listen(3000, () => {
  console.log("Server up and running");
});

const blendRouter = require("./api/blend/blend.router");
app.use("/api/blend", blendRouter);

const reclaimingRouter = require("./api/reclaiming/reclaiming.router");
app.use("/api/reclaiming", reclaimingRouter);

const feedingRouter = require("./api/feeding/feeding.router");
app.use("/api/feeding", feedingRouter);

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

const employeDetailsRouter = require("./api/employedetails/employedetails.router");
app.use("/api/employedetails", employeDetailsRouter);

const shiftReportEnteredByRouter = require("./api/shiftreportenteredby/shiftreportenteredby.router");
app.use("/api/shiftreportenteredby", shiftReportEnteredByRouter);
