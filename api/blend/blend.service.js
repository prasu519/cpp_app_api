const Blend = require("../models/BlendModel");
const BlendCpp3 = require("../models/BlendModelCpp3");
const { feedingServiceTotalFeeding } = require("../feeding/feeding.service");

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

  blendServicePostCpp3: async (data, callback) => {
    try {
      const addBlend = new BlendCpp3(data);
      await addBlend.save();
      return callback(null, addBlend);
    } catch (error) {
      return callback(error);
    }
  },

  blendServiceGetDatewise: async (
    selectedFromDate,
    selectedToDate,
    callback
  ) => {
    try {
      const formatedFromDate = selectedFromDate + "T00:00:00.000+00:00"; //"T23:59:59.999+00:00";
      const formatedToDate = selectedToDate + "T00:00:00.000+00:00"; //"T23:59:59.999+00:00";

      let blendResults = await Blend.find({
        date: { $gte: formatedFromDate, $lte: formatedToDate },
      })
        .sort({ date: 1, shift: 1 })
        .exec();

      return callback(null, blendResults);
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  },

  blendServiceGetDatewiseCpp3: async (
    selectedFromDate,
    selectedToDate,
    callback
  ) => {
    try {
      const formatedFromDate = selectedFromDate + "T00:00:00.000+00:00"; //"T23:59:59.999+00:00";
      const formatedToDate = selectedToDate + "T00:00:00.000+00:00"; //"T23:59:59.999+00:00";

      let blendResultsCpp3 = await BlendCpp3.find({
        date: { $gte: formatedFromDate, $lte: formatedToDate },
      })
        .sort({ date: 1, shift: 1 })
        .exec();

      return callback(null, blendResultsCpp3);
    } catch (error) {
      console.log(error);
      return callback(error);
    }
  },

  blendServiceGet: async (selectedDate, selectedShift, callback) => {
    const formatedDate = selectedDate + "T00:00:00.000+00:00"; //"T23:59:59.999+00:00";

    if (selectedShift === "B" || selectedShift === "C") {
      try {
        // Step 1: Find the maximum date less than or equal to selectedDate
        let maxDateResult = await Blend.find({ date: { $lte: formatedDate } })
          .sort({ date: -1 })
          .limit(1)
          .exec();
        let maxDate = maxDateResult.length > 0 ? maxDateResult[0].date : null;

        // Step 2: Find the maximum shift for that date less than or equal to selectedShift
        let maxShift = null;
        if (maxDate) {
          let maxShiftResult = await Blend.find({
            date: maxDate,
            shift: { $lte: selectedShift },
          })
            .sort({ Shift: -1, _id: -1 })
            .limit(1)
            .exec();
          maxShift = maxShiftResult.length > 0 ? maxShiftResult[0].shift : null;
          let fMaxDate = new Date(maxDate).toISOString().split("T")[0];

          if (maxShift === null) {
            if (fMaxDate === selectedDate) {
              // Step 2.1: Find the maximum date less than or equal to selectedDate
              maxDateResult = await Blend.find({
                date: { $lt: formatedDate },
              })
                .sort({ date: -1 })
                .limit(1)
                .exec();
              maxDate = maxDateResult.length > 0 ? maxDateResult[0].date : null;

              // Step 2.2: Find the maximum shift for that date less than or equal to selectedShift
              maxShift = null;
              if (maxDate) {
                maxShiftResult = await Blend.find({
                  date: maxDate,
                  shift: { $lte: selectedShift },
                })
                  .sort({ Shift: -1, _id: -1 })
                  .limit(1)
                  .exec();
                maxShift =
                  maxShiftResult.length > 0 ? maxShiftResult[0].shift : null;

                if (maxShift === null) {
                  maxShiftResult = await Blend.find({
                    date: maxDate,
                    shift: { $gte: selectedShift },
                  })
                    .sort({ Shift: -1, _id: -1 })
                    .limit(1)
                    .exec();
                  maxShift =
                    maxShiftResult.length > 0 ? maxShiftResult[0].shift : null;
                }
              }
            } else {
              maxShiftResult = await Blend.find({
                date: maxDate,
                shift: { $gte: selectedShift },
              })
                .sort({ Shift: -1, _id: -1 })
                .limit(1)
                .exec();
              maxShift =
                maxShiftResult.length > 0 ? maxShiftResult[0].shift : null;
            }
          }
        }
        // Step 3: Query the documents with the maximum date and shift
        let getBlend = [];
        if (maxDate && maxShift !== null) {
          getBlend = await Blend.find({
            date: maxDate,
            shift: maxShift,
          })
            .sort({ _id: -1 })
            .limit(1)
            .exec();
        }

        return callback(null, getBlend);
      } catch (error) {
        console.log(error);
        return callback(error);
      }
    } else {
      try {
        // Step 1: Find the maximum date less than or equal to selectedDate
        let maxDateResult = await Blend.find({ date: { $lte: formatedDate } })
          .sort({ date: -1 })
          .limit(1)
          .exec();
        let maxDate = maxDateResult.length > 0 ? maxDateResult[0].date : null;

        // Step 2: Find the maximum shift for that date less than or equal to selectedShift
        let maxShift = null;
        if (maxDate) {
          let maxShiftResult = await Blend.find({
            date: maxDate,
            shift: "A",
          })
            .sort({ _id: -1 })
            .limit(1)
            .exec();
          maxShift = maxShiftResult.length > 0 ? maxShiftResult[0].shift : null;

          if (maxShift === null) {
            // Step 1: Find the maximum date less than or equal to selectedDate
            maxDateResult = await Blend.find({
              date: { $lt: formatedDate },
            })
              .sort({ date: -1 })
              .limit(1)
              .exec();
            maxDate = maxDateResult.length > 0 ? maxDateResult[0].date : null;

            // Step 2: Find the maximum shift for that date less than or equal to selectedShift
            maxShift = null;
            if (maxDate) {
              maxShiftResult = await Blend.find({
                date: maxDate,
                shift: { $gte: selectedShift },
              })
                .sort({ Shift: -1, _id: -1 })
                .limit(1)
                .exec();
              maxShift =
                maxShiftResult.length > 0 ? maxShiftResult[0].shift : null;
            }
          }

          // Step 3: Query the documents with the maximum date and shift

          if (maxDate && maxShift !== null) {
            getBlend = await Blend.find({
              date: maxDate,
              shift: maxShift,
            })
              .sort({ _id: -1 })
              .limit(1)
              .exec();
          }
        }

        return callback(null, getBlend);
      } catch (error) {
        console.log(error);
        return callback(error);
      }
    }
  },

  blendServiceGetCpp3: async (selectedDate, selectedShift, callback) => {
    const formatedDate = selectedDate + "T00:00:00.000+00:00"; //"T23:59:59.999+00:00";

    if (selectedShift === "B" || selectedShift === "C") {
      try {
        // Step 1: Find the maximum date less than or equal to selectedDate
        let maxDateResult = await BlendCpp3.find({
          date: { $lte: formatedDate },
        })
          .sort({ date: -1 })
          .limit(1)
          .exec();
        let maxDate = maxDateResult.length > 0 ? maxDateResult[0].date : null;

        // Step 2: Find the maximum shift for that date less than or equal to selectedShift
        let maxShift = null;
        if (maxDate) {
          let maxShiftResult = await BlendCpp3.find({
            date: maxDate,
            shift: { $lte: selectedShift },
          })
            .sort({ Shift: -1, _id: -1 })
            .limit(1)
            .exec();
          maxShift = maxShiftResult.length > 0 ? maxShiftResult[0].shift : null;
          let fMaxDate = new Date(maxDate).toISOString().split("T")[0];

          if (maxShift === null) {
            if (fMaxDate === selectedDate) {
              // Step 2.1: Find the maximum date less than or equal to selectedDate
              maxDateResult = await BlendCpp3.find({
                date: { $lt: formatedDate },
              })
                .sort({ date: -1 })
                .limit(1)
                .exec();
              maxDate = maxDateResult.length > 0 ? maxDateResult[0].date : null;

              // Step 2.2: Find the maximum shift for that date less than or equal to selectedShift
              maxShift = null;
              if (maxDate) {
                maxShiftResult = await BlendCpp3.find({
                  date: maxDate,
                  shift: { $lte: selectedShift },
                })
                  .sort({ Shift: -1, _id: -1 })
                  .limit(1)
                  .exec();
                maxShift =
                  maxShiftResult.length > 0 ? maxShiftResult[0].shift : null;

                if (maxShift === null) {
                  maxShiftResult = await BlendCpp3.find({
                    date: maxDate,
                    shift: { $gte: selectedShift },
                  })
                    .sort({ Shift: -1, _id: -1 })
                    .limit(1)
                    .exec();
                  maxShift =
                    maxShiftResult.length > 0 ? maxShiftResult[0].shift : null;
                }
              }
            } else {
              maxShiftResult = await BlendCpp3.find({
                date: maxDate,
                shift: { $gte: selectedShift },
              })
                .sort({ Shift: -1, _id: -1 })
                .limit(1)
                .exec();
              maxShift =
                maxShiftResult.length > 0 ? maxShiftResult[0].shift : null;
            }
          }
        }
        // Step 3: Query the documents with the maximum date and shift
        let getBlend = [];
        if (maxDate && maxShift !== null) {
          getBlend = await BlendCpp3.find({
            date: maxDate,
            shift: maxShift,
          })
            .sort({ _id: -1 })
            .limit(1)
            .exec();
        }

        return callback(null, getBlend);
      } catch (error) {
        console.log(error);
        return callback(error);
      }
    } else {
      try {
        // Step 1: Find the maximum date less than or equal to selectedDate
        let maxDateResult = await BlendCpp3.find({
          date: { $lte: formatedDate },
        })
          .sort({ date: -1 })
          .limit(1)
          .exec();
        let maxDate = maxDateResult.length > 0 ? maxDateResult[0].date : null;

        // Step 2: Find the maximum shift for that date less than or equal to selectedShift
        let maxShift = null;
        if (maxDate) {
          let maxShiftResult = await BlendCpp3.find({
            date: maxDate,
            shift: "A",
          })
            .sort({ _id: -1 })
            .limit(1)
            .exec();
          maxShift = maxShiftResult.length > 0 ? maxShiftResult[0].shift : null;

          if (maxShift === null) {
            // Step 1: Find the maximum date less than or equal to selectedDate
            maxDateResult = await BlendCpp3.find({
              date: { $lt: formatedDate },
            })
              .sort({ date: -1 })
              .limit(1)
              .exec();
            maxDate = maxDateResult.length > 0 ? maxDateResult[0].date : null;

            // Step 2: Find the maximum shift for that date less than or equal to selectedShift
            maxShift = null;
            if (maxDate) {
              maxShiftResult = await BlendCpp3.find({
                date: maxDate,
                shift: { $gte: selectedShift },
              })
                .sort({ Shift: -1, _id: -1 })
                .limit(1)
                .exec();
              maxShift =
                maxShiftResult.length > 0 ? maxShiftResult[0].shift : null;
            }
          }

          // Step 3: Query the documents with the maximum date and shift

          if (maxDate && maxShift !== null) {
            getBlend = await BlendCpp3.find({
              date: maxDate,
              shift: maxShift,
            })
              .sort({ _id: -1 })
              .limit(1)
              .exec();
          }
        }

        return callback(null, getBlend);
      } catch (error) {
        console.log(error);
        return callback(error);
      }
    }
  },
};
