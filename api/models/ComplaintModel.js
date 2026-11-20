const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },

    shift: {
      type: String,
      required: true,
    },

    empNo: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    complaintType: {
      type: String,
      required: true,
    },

    stream: {
      type: String,
      required: true,
    },

    equipment: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },

    image: {
      filename: {
        type: String,
      },
      path: {
        type: String,
      },
      mimetype: {
        type: String,
      },
    },

    voice: {
      filename: {
        type: String,
      },
      path: {
        type: String,
      },
      mimetype: {
        type: String,
      },
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      default: "Pending",
    },

    updatedBy: {
      type: String,
      default: "xxx",
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
