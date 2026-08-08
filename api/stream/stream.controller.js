const streamService = require("../stream/stream.service");

const getStreams = async (req, res) => {
  try {
    const streams = await streamService.getStreams();

    const result = streams.map((item) => ({
      label: item.streamName,
      value: item.streamId,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getStreams,
};
