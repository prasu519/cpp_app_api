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
  oldcoal1name: {
    type: String,
  },
  oldcoal1stock: {
    type: Number,
  },
  oldcoal2name: {
    type: String,
  },
  oldcoal2stock: {
    type: Number,
  },
  oldcoal3name: {
    type: String,
  },
  oldcoal3stock: {
    type: Number,
  },
  oldcoal4name: {
    type: String,
  },
  oldcoal4stock: {
    type: Number,
  },
  oldcoal5name: {
    type: String,
  },
  oldcoal5stock: {
    type: Number,
  },
  oldcoal6name: {
    type: String,
  },
  oldcoal6stock: {
    type: Number,
  },
  oldcoal7name: {
    type: String,
  },
  oldcoal7stock: {
    type: Number,
  },
  oldcoal7name: {
    type: String,
  },
  oldcoal7stock: {
    type: Number,
  },
  oldcoal8name: {
    type: String,
  },
  oldcoal8stock: {
    type: Number,
  },
  cpp3coal1name: {
    type: String,
  },
  cpp3coal1stock: {
    type: Number,
  },
  cpp3coal2name: {
    type: String,
  },
  cpp3coal2stock: {
    type: Number,
  },
  cpp3coal3name: {
    type: String,
  },
  cpp3coal3stock: {
    type: Number,
  },
  cpp3coal4name: {
    type: String,
  },
  cpp3coal4stock: {
    type: Number,
  },
  cpp3coal5name: {
    type: String,
  },
  cpp3coal5stock: {
    type: Number,
  },
  cpp3coal6name: {
    type: String,
  },
  cpp3coal6stock: {
    type: Number,
  },
  total_stock: {
    type: Number,
  },
  cpp3total_stock: {
    type: Number,
  },
});
mbtopStockSchema.index({ date: 1, shift: 1 }, { unique: true });
const MbTopStock = mongoose.model("MbTopStock", mbtopStockSchema);
module.exports = MbTopStock;
