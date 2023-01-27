require("dotenv").config();
const Message = require("../models/message.model");

/* Creating a new message in the database. */
exports.getMessage = async (req, res, next) => {
  await Message.find()
    .populate("nickname")
    .exec((err, messages) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(messages);
    });
};
