const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const channelSchema = mongoose.Schema(
  {
    name: {
      type: "string",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    connected_users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Channel", channelSchema);
