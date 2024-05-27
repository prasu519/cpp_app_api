const mongoose = require("mongoose");

const mbtopStockSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  coal1name: {
    type: String,
  },
  coal1stock: {
    type: Number,
  },
  coal2name: {
    type: String,
  },
  coal2stock: {
    type: Number,
  },
  coal3name: {
    type: String,
  },
  coal3stock: {
    type: Number,
  },
  coal4name: {
    type: String,
  },
  coal4stock: {
    type: Number,
  },
  coal5name: {
    type: String,
  },
  coal5stock: {
    type: Number,
  },
  coal6name: {
    type: String,
  },
  coal6stock: {
    type: Number,
  },
  coal7name: {
    type: String,
  },
  coal7stock: {
    type: Number,
  },
  coal8name: {
    type: String,
  },
  coal8stock: {
    type: Number,
  },
  total_stock: {
    type: Number,
  },
});
mbtopStockSchema.index({ date: 1, shift: 1 }, { unique: true });
const MbTopStock = mongoose.model("MbTopStock", mbtopStockSchema);
module.exports = MbTopStock;
