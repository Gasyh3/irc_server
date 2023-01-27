const express = require("express");
const router = express.Router();
const messageControl = require("../controllers/message.controllers");

router.get("/getMessage", messageControl.getMessage);

module.exports = router;
