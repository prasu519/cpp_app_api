const mongoose = require("mongoose");

const mechanicalAreaSchema = new mongoose.Schema(
  {
    equipmentType: {
      type: String,
      required: true,
      enum: ["conveyor", "screen", "wf", "crusher", "jh"],
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
mechanicalAreaSchema.index({ equipmentType: 1, areaId: 1 }, { unique: true });

const MechanicalArea = mongoose.model("MechanicalArea", mechanicalAreaSchema);

module.exports = MechanicalArea;
