const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = mongoose.Schema(
  {
    nickname: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message_text: {
      type: String,
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
