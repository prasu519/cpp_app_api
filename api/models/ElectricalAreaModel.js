const mongoose = require("mongoose");

const electricalAreaSchema = new mongoose.Schema(
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
electricalAreaSchema.index({ equipmentType: 1, areaId: 1 }, { unique: true });

const ElectricalArea = mongoose.model("ElectricalArea", electricalAreaSchema);

module.exports = ElectricalArea;
