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
    const posts = await postModal
      .find()
      .populate([{ path: "userId" }, { path: 'comments.userId' }]);
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

const handleLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const username = req.session.passport.user;

    const post = await postModal.findById(postId);

    if (post) {
      const likeArray = post.likes;

      if (likeArray.includes(username)) {
        let ind = likeArray.indexOf(username);
        likeArray.splice(ind, 1);
      } else {
        likeArray.push(username);
      }

      await post.save();
      return res.status(200).json({
        message: "post liked",
        post: post.postText,
        likeArray: post.likes,
      });
    } else {
      return res.status(404).json({
        message: "Post not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "error liking post", error: error });
  }
};
const handleComment = async (req, res) => {
  try {
    const { postId, text } = req.body;

    const curr_User = await userModal.findOne({
      username: req.session.passport.user,
    });

    const post = await postModal.findById(postId);

    if (post) {
      post.comments.push({
        userId: curr_User._id,
        commentText: text,
      });

      await post.save();
      return res.status(200).json({
        message: "Commented on post",
        post: post.postText,
        comments: post.comments,
      });
    } else {
      return res.status(404).json({
        message: "Post not found",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error commenting on  post", error: error });
  }
};

module.exports = { createPost, getAllPosts, handleLike, handleComment };
