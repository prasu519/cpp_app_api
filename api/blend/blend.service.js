const Blend = require("../models/BlendModel");

module.exports = {
  blendServicePost: async (data, callback) => {
    try {
      const addBlend = new Blend(data);
      await addBlend.save();
      return callback(null, addBlend);
    } catch (error) {
      return callback(error);
    }
  },

  blendServiceGet: async (date, shift, callback) => {
    const endDate = date + "T23:59:59.999+00:00";
    try {
      const getBlend = await Blend.find({ date: { $lte: endDate } })
        .sort({ date: -1 })
        .limit(1);
      return callback(null, getBlend);
    } catch (error) {
      return callback(error);
    }
  },
};
