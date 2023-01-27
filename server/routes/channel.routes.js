const express = require("express");
const router = express.Router();
const channelControl = require("../controllers/channel.controllers");
const { auth } = require("../middlewares/auth.middleware");

router.post("/create", auth, channelControl.create);
router.get("/get/:id", auth, channelControl.getChannel);
router.delete("/delete/:id", channelControl.delete);
router.post("/join", auth, channelControl.join);

module.exports = router;
