const passport = require("passport");
const userModal = require("../models/user.model");
const validator = require("validator");
const { uploadOnCloudinary } = require("../services/cloudinary.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { username, email, fullName, password, profilePic } = req.body;

    // Convert fields to lowercase
    const lowerUsername = username.trim().toLowerCase();
    const user = await userModal.findOne({ username: lowerUsername });

    if (user) {
      return res.json(user);
    }
    const lowerEmail = email.toLowerCase();
    const lowerFullName = fullName.toLowerCase();

    if (lowerUsername.length === 0)
      return res.status(400).json({ error: "Invalid Username" });

    if (!validator.isEmail(lowerEmail)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Validate password (example: at least 8 characters)
    if (!validator.isLength(password, { min: 8 })) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    /**
     *

    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

    if (!cloudinaryResponse) {
      return res.status(500).json({ error: "Failed to upload to Cloudinary" });
    }
    */

    // <TODO>image uploading</TODO>;

    const hashedPassword = bcrypt.hash(password, 10);


    const userData = new userModal({
      username: lowerUsername,
      email: lowerEmail,
      fullName: lowerFullName,
      profilePic: profilePic,
      password: hashedPassword,
    });
    await userData.save();
    // const token = jwt.sign({ userId: userData._id }, "your-secret-key");

    res.status(201).json({ message: `Welcome ${lowerUsername}`, userData });
  } catch (error) {
    console.log("Internal Server Error", error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

const loginUser = (req, res, next) => {
  const {username , password} = req.body;


};

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
const getAllUser = async (req, res) => {
  try {
    const allUser = await userModal.find();

    res.status(200).json({
      success: newUser,
    });
  } catch (error) {
    console.log("Internal Server Error", error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModal
      .findById({ _id: userId })
      .populate([{ path: "posts" }, { path: "posts.userId" }]);
    res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.log("Internal Server Error", error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

const getProfileData = async (req, res) => {
  try {
    const user = await userModal
      .findOne({
        username: req.session.passport.user,
      })
      .populate({ path: "posts" })
      .populate({ path: "posts.userId" })
      .populate({ path: "posts.comments" })
      .populate({
        path: "posts",
        populate: {
          path: "userId comments.userId",
        },
      });

    res.status(200).json({ user: user });
  } catch (error) {
    console.log("Internal Server Error", error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, fullName } = req.body;
    const oldUser = await userModal.findOne({
      username: req.session.passport.user,
    });
    const lowerUsername = username ? username.toLowerCase() : oldUser.username;
    const lowerFullName = fullName ? fullName.toLowerCase() : oldUser.fullName;

    const updatedUserData = {};
    console.log(req.file);
    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (!cloudinaryResponse) {
        return res
          .status(500)
          .json({ message: "Failed to upload to cloudinary" });
      }
      updatedUserData.profilePic = cloudinaryResponse.secure_url;
    }

    updatedUserData.username = lowerUsername;
    updatedUserData.fullName = lowerFullName;
    const updatedUser = await userModal.findOneAndUpdate(
      { username: req.session.passport.user },
      {
        $set: updatedUserData,
      },
      {
        new: true,
      }
    );
    console.log("check user data: " + updatedUserData);
    console.log("updated user data: " + updatedUser);
    res.status(200).json({
      message: "Updated successfully",
      user: updatedUser,
      "check user data: ": updatedUserData,
    });
  } catch (error) {
    console.log("Internal Server Error", error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    // User is not authenticated
    res.status(401).json({ authenticated: false, message: "Login please..." });
  }
};

module.exports = {
  createUser,
  getUserDetails,
  logoutUser,
  isLoggedIn,
  loginUser,
  getProfileData,
  updateUser,
};
