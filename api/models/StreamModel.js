const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
  streamId: {
    type: String,
    required: true,
    unique: true,
  },

  streamName: {
    type: String,
    required: true,
  },
});

streamSchema.index({ streamId: 1 }, { unique: true });

const Stream = mongoose.model("Stream", streamSchema);

module.exports = Stream;
