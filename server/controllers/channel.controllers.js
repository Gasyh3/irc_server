require("dotenv").config();
const Channel = require("../models/channel.model");

/* It's creating a new channel. */
exports.create = (req, res, next) => {
  const channel = new Channel({
    name: req.body.name,
    created_by: req.body.created_by,
    connected_users: req.body.connected_users,
  });
  channel
    .save()
    .then(() => {
      res.status(201).json({
        message: "Channel créé !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

/* It's finding a channel. */
exports.getChannel = (req, res, next) => {
  Channel.findOne({ _id: req.params.id })
    .then((channel) => {
      res.status(200).json(channel);
    })
    .catch((error) => {
      res.status(404).json({
        error,
      });
    });
};

/* It's deleting a channel. */
exports.delete = (req, res, next) => {
  Channel.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Channel supprimé !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

/* It's finding a channel. */
exports.join = (req, res, next) => {
  Channel.findOneandUpdate(
    { _id: req.params.id },
    { $push: { connected_users: req.body.connected_users } }
  )
    .then((channel) => {
      res.status(200).json(channel);
    })
    .catch((error) => {
      res.status(404).json({
        error,
      });
    });
};
