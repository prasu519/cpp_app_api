const express = require("express");

const router = express.Router();

const streamController = require("../stream/stream.controller");

router.get("/", streamController.getStreams);

module.exports = router;
