const mongoose = require("mongoose");

const reclaimingSchema = mongoose.Schema({
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
  coal1recl: {
    type: Number,
  },
  coal2name: {
    type: String,
  },
  coal2recl: {
    type: Number,
  },
  coal3name: {
    type: String,
  },
  coal3recl: {
    type: Number,
  },
  coal4name: {
    type: String,
  },
  coal4recl: {
    type: Number,
  },
  coal5name: {
    type: String,
  },
  coal5recl: {
    type: Number,
  },
  coal6name: {
    type: String,
  },
  coal6recl: {
    type: Number,
  },
  coal7name: {
    type: String,
  },
  coal7recl: {
    type: Number,
  },
  coal8name: {
    type: String,
  },
  coal8recl: {
    type: Number,
  },
  excoal1name: {
    type: String,
  },
  excoal1recl: {
    type: Number,
  },
  excoal2name: {
    type: String,
  },
  excoal2recl: {
    type: Number,
  },
  excoal3name: {
    type: String,
  },
  excoal3recl: {
    type: Number,
  },
  excoal4name: {
    type: String,
  },
  excoal4recl: {
    type: Number,
  },
  excoal5name: {
    type: String,
  },
  excoal5recl: {
    type: Number,
  },
  excoal6name: {
    type: String,
  },
  excoal6recl: {
    type: Number,
  },
  excoal7name: {
    type: String,
  },
  excoal7recl: {
    type: Number,
  },
  excoal8name: {
    type: String,
  },
  excoal8recl: {
    type: Number,
  },
  cc49recl: {
    type: Number,
  },
  cc50recl: {
    type: Number,
  },
  cc126recl: {
    type: Number,
  },
  total_reclaiming: {
    type: Number,
  },
});

reclaimingSchema.index({ date: 1, shift: 1 }, { unique: true });

const Reclaiming = mongoose.model("Reclaiming", reclaimingSchema);
module.exports = Reclaiming;
