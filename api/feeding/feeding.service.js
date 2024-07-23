const Feeding = require("../models/FeedingModel");

module.exports = {
  feedingService: async (data, callback) => {
    try {
      const addFeeding = new Feeding(data);
      await addFeeding.save();
      return callback(null, addFeeding);
    } catch (error) {
      return callback(error);
    }
  },

  feedingServiceRead: async (date, shift, callback) => {
    try {
      const getFeeding = await Feeding.find({ date: date, shift: shift });
      return callback(null, getFeeding);
    } catch (error) {
      return callback(error);
    }
  },

  feedingServiceReadDaywise: async (date, callback) => {
    try {
      const getFeedingdaywise = await Feeding.find({ date: date });
      return callback(null, getFeedingdaywise);
    } catch (error) {
      return callback(error);
    }
  },

  feedingServiceUpdate: async (data, callBack) => {
    try {
      const updateFeeding = await Feeding.updateOne(
        { date: data.date, shift: data.shift },
        {
          ct1: data.ct1,
          ct2: data.ct2,
          ct3: data.ct3,
          stream1: data.stream1,
          stream1A: data.stream1A,
          New_Stream: data.New_Stream,
          total_feeding: data.total_feeding,
        },
        { new: true }
      );
      return callBack(null, updateFeeding);
    } catch (error) {
      return callBack(error);
    }
  },
};
