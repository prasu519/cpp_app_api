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
    console.log(date);
    const endDate = date + "T00:00:00.000+00:00"; //"T23:59:59.999+00:00";
    try {
      const getBlend = await Blend.find({
        $and: [{ date: { $lte: endDate } }, { shift: shift }],
      })
        .sort({ _id: -1 })
        .limit(1);
      console.log(getBlend);
      return callback(null, getBlend);
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  },
};
