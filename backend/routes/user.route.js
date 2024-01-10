
const express = require("express");
const router = express.Router();


const upload = require("../services/multer");

const {
  createUser,
  getUserDetails,

  isLoggedIn,
  loginUser,
  getProfileData,
  updateUser,
} = require("../controllers/user.controller");



router.post("/create", upload.single("profilePic"), createUser);

router.get("/get_user", isLoggedIn, getUserDetails);
router.get("/profile", isLoggedIn, getProfileData);

router.post("/login", loginUser);



router.get("/isAuthenticated", isLoggedIn);

router.post(
  "/update",
  isLoggedIn,
  upload.single("updateProfilePic"),
  updateUser
);

module.exports = router;
