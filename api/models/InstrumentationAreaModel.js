const mongoose = require("mongoose");

const instrumentationAreaSchema = new mongoose.Schema(
  {
    equipmentType: {
      type: String,
      required: true,
      enum: ["conveyor", "screen", "wf", "crusher"],
    },

    areaId: {
      type: String,
      required: true,
    },

    areaName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate area IDs for the same equipment type
instrumentationAreaSchema.index(
  { equipmentType: 1, areaId: 1 },
  { unique: true }
);

const InstrumentationArea = mongoose.model(
  "InstrumentationArea",
  instrumentationAreaSchema
);

module.exports = InstrumentationArea;
