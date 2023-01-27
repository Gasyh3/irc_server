require("dotenv").config();
const User = require("../models/user.model.js");

exports.auth = (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    nickname: req.user.nickname,
  });
};

/* Creating a new user with the nickname from the request body. */
exports.register = (req, res, next) => {
  const user = new User({
    nickname: req.body.nickname,
  });
  user
    .save()
    .then(() => {
      res.status(201).json({
        message: "Utilisateur créé !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

/* Looking for a user with the nickname from the request body. */
exports.login = (req, res, next) => {
  User.findOne({
    nickname: req.body.nickname,
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "Utilisateur non trouvé !",
        });
      } else {
        res.status(200).json({
          message: "Utilisateur trouvé !",
        });
      }
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

/* It's a function that updates the token and tokenExp of the user. */
exports.logout = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
};

/* It's a function that returns all the users in the database. */
exports.users = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};
