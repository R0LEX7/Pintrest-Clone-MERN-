const express = require("express");

const router = express.Router();
const {
  createPost,
  getAllPosts,
  handleLike,
  handleComment,
  isLiked,
  getSinglePost,
  deletePost,
} = require("../controllers/post.controller");
const upload = require("../services/multer");
const { isLoggedIn } = require("../controllers/user.controller");

router.post("/create", isLoggedIn, upload.single("image"), createPost);
router.get("/all_posts", getAllPosts);
router.get("/is_liked", isLiked);
router.get("/get_post", getSinglePost);
router.delete("/delete",  deletePost);
router.post("/like", isLoggedIn, handleLike);
router.post("/comment", isLoggedIn, handleComment);

module.exports = router;
