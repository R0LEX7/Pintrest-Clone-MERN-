const postModal = require("../models/post.model");
const userModal = require("../models/user.model");
const upload = require("../services/multer.js");
const { uploadOnCloudinary } = require("../services/cloudinary.js");

const createPost = async (req, res) => {
  try {
    // if file not found
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: "file is required" });
    }
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

    // if cloudinary response found
    if (cloudinaryResponse) {
      const { postText } = req.body;
      if(!postText || postText.trim().length === 0) return res.status(400).json({ message: "Caption is required" });
      const user = await userModal.findOne({
        username: req.username,
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
      .populate([{ path: "userId" }, { path: "comments.userId" }]);
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log("Internal error: " + error);
    return res.status(400).json({
      success: false,
      message : "Internal error ",
      error: error.message,
    });
  }
};

const handleLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const username = req.username;

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
      username: req.username,
    });

    let post = await postModal.findById(postId);

    if (post) {
      const commentArr = post.comments;
      commentArr.push({
        userId: curr_User._id,
        commentText: text,
      });

      await post.save();
      post = await postModal
        .findById(postId)
        .populate([
          { path: "userId" },
          { path: "comments" },
          { path: "comments.userId" },
        ]);
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

const isLiked = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const post = await postModal.findById(postId);
    const user = await userModal.findById(userId);

    if (post.likes.includes(user.username)) {
      return res.status(200).json({
        message: "liked by user",
        post: post.postText,
        isLiked: true,
      });
    } else {
      return res.status(200).json({
        message: "not liked by user",
        post: post.postText,
        isLiked: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal error",
      error: error,
    });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const { id } = req.query; // Use req.query.id to get the id parameter from the URL

    console.log("ID from frontend:", id);

    console.log(id);
    console.log("req.body", req.body);

    const post = await postModal
      .findById(id)
      .populate([
        { path: "userId" },
        { path: "comments" },
        { path: "comments.userId" },
      ]);
    console.log(post);
    if (post) {
      return res
        .status(200)
        .json({ success: true, message: "post found", data: post });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "post not found", id: id });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.query;

    const curr_User = await userModal.findOne({
      username: req.username,
    });
    console.log("username :" + req.usernamename);
    console.log("curr" + curr_User.username);
    const post = await postModal.findById(postId).populate("userId");
    if (!post)
      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    console.log(post);
    if (curr_User._id.equals(post.userId._id)) {
      const deletePost = await postModal.findByIdAndDelete(postId);

      if (deletePost)
        return res.status(200).json({
          success: true,
          message: "deleted Successfully",
          data: deletePost,
        });

      return res.status(404).json({
        success: false,
        message: "post not found",
        data: deletePost,
      });
    } else {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  handleLike,
  handleComment,
  isLiked,
  getSinglePost,
  deletePost,
};
