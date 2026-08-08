const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  equipmentId: {
    type: String,
    required: true,
    unique: true,
  },

  equipmentName: {
    type: String,
    required: true,
  },

  streamId: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
    enum: ["conveyor", "screen", "crusher", "wf"],
  },
});

equipmentSchema.index({ streamId: 1, equipmentId: 1 }, { unique: true });

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;
