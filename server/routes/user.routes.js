const express = require("express");
const router = express.Router();
const userControl = require("../controllers/user.controllers");
const { auth } = require("../middlewares/auth.middleware");

router.get("/auth", auth, userControl.auth);
router.post("/register", userControl.register);
router.post("/login", userControl.login);
router.get("/users", userControl.users);
router.get("/logout", auth, userControl.logout);

module.exports = router;
