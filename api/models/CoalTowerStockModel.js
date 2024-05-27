const mongoose = require("mongoose");

const coalTowerStockSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  ct1stock: {
    type: Number,
  },
  ct2stock: {
    type: Number,
  },
  ct3stock: {
    type: Number,
  },
  total_stock: {
    type: Number,
  },
});
coalTowerStockSchema.index({ date: 1, shift: 1 }, { unique: true });
const CoalTowerStock = mongoose.model("CoalTowerStock", coalTowerStockSchema);
module.exports = CoalTowerStock;
