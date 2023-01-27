/**
 * * Imports
 */
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const express = require("express");
const moment = require("moment");

const server = require("./server.js");
const io = require("socket.io")(server);
const app = express();
const { json } = require("body-parser");

const messageRoutes = require("./routes/message.routes");
const userRoutes = require("./routes/user.routes");
const channelRoutes = require("./routes/channel.routes");

/**
 * * Connexion à la base de données
 */
mongoose.set("strictQuery", true);
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clusterirc.jacjoom.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

/**
 * * Gestion de la Socket
 */
io.on("connection", (socket) => {
  socket.join("General");

  socket.on("joinRoom", ({ user, room }) => {
    socket.join(room);

    socket
      .to(msg.channel)
      .broadcast.emit(
        "Output Chat Message",
        formatMessage(Chat, `${user.nickname} has joined the chat`)
      );
    socket.emit(
      "Output Chat Message",
      formatMessage(Chat, `Welcome to ${room}!`)
    );

    io.to(room).emit("roomUsers", {
      room: room,
      users: getRoomUsers(room),
    });
  });

  socket.on("Input Chat Message", (msg) => {
    connect.then((db) => {
      try {
        let chat = new Message({
          message_text: msg.chatMessage,
          nickname: msg.userId,
          channel: msg.channel,
        });

        chat.save((err) => {
          if (err) return res.json({ success: false, err });

          Message.find({ _id: doc._id })
            .populate("nickname")
            .populate("channel")
            .exec((err) => {
              return io.to(msg.channel).emit("Output Chat Message");
            });
        });
      } catch (error) {
        console.error(error);
      }
    });
  });

  socket.on("Input Private Message", (msg) => {
    io.to(msg.receiverId).emit(
      "Output Chat Message",
      formatMessage(msg.userId, msg.chatMessage)
    );
  });

  socket.on("disconnect", ({ user, room }) => {
    if (user) {
      io.to(room).emit(
        "Output Chat Message",
        formatMessage(`${user.nickname} has left the chat`)
      );

      io.to(room).emit("roomUsers", {
        room: room,
        users: getRoomUsers(room),
      });
    }
  });
});

/**
 * * Régler les problèmes de CORS
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.removeHeader("x-powered-by");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

function formatMessage(user, text) {
  return {
    user,
    text,
    time: moment().format("h:mm a"),
  };
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());

/**
 * * Routes
 * * Les routes sont définies dans le dossier routes
 */
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/channels", channelRoutes);

module.exports = app;
