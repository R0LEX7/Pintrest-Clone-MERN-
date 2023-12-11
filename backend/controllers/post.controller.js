const postModal = require("../models/post.model");
const userModal = require("../models/user.model");
const upload = require("../services/multer.js");
const { uploadOnCloudinary } = require("../services/cloudinary.js");

const createPost = async (req, res) => {
  try {
    // if file not found
    if (!req.file) {
      return res.status(400).json({ error: "file is required" });
    }
    console.log(req.file);
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

    // if cloudinary response found
    if (cloudinaryResponse) {
      const { postText } = req.body;
      const user = await userModal.findOne({
        username: req.session.passport.user,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const newPost = await postModal.create({
        postText,
        userId: user._id,
        image: cloudinaryResponse.secure_url,
      });

      user.posts.push(newPost._id);
      await user.save();
      return res
        .status(201)
        .json({ success: "Post created successfully", createdPost: newPost });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to upload to Cloudinary" });
    }
  } catch (error) {
    console.log("Internal Server Error", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModal.find().populate("userId");
    console.log("found" , posts)
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log("Internal error: " + error);
    return res.status().json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { createPost, getAllPosts };
