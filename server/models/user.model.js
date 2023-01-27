const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  nickname: {
    type: "string",
    required: true,
    unique: true,
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.methods.generateToken = function (e) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), "secret");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    e(null, user);
  });
};

userSchema.statics.findByToken = function (token, e) {
  var user = this;
  jwt.verify(token, "secret", function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      e(null, user);
    });
  });
};

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
