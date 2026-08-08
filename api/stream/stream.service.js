const Stream = require("../models/StreamModel");

const getStreams = async () => {
  return await Stream.find(
    {},
    {
      _id: 0,
      streamId: 1,
      streamName: 1,
    }
  ).sort({ streamName: 1 });
};

module.exports = {
  getStreams,
};
