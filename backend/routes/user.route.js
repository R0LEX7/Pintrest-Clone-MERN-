// routes/user.route.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const localStrategy = require("passport-local");
const userModel = require("../models/user.model");

const upload = require("../services/multer");

const {
  createUser,
  getUserDetails,
  logoutUser,
  isLoggedIn,
  loginUser,
  getProfileData
} = require("../controllers/user.controller");

passport.use(new localStrategy(userModel.authenticate()));

router.post("/create",upload.single("profilePic") , createUser);

router.get("/get_user" , isLoggedIn ,  getUserDetails)
router.get("/profile" , isLoggedIn ,  getProfileData)

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/isAuthenticated", isLoggedIn);

router.get("/profile", isLoggedIn, (req, res) => {
  res.send("Welcome to pintrest");
});

module.exports = router;
