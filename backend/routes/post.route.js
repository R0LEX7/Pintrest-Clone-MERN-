const express = require("express");

const router = express.Router();
const { createPost , getAllPosts } = require("../controllers/post.controller");
const upload = require("../services/multer");
const { isLoggedIn } = require("../controllers/user.controller");

router.post("/create",isLoggedIn, upload.single("image"), createPost);
router.get("/all_posts" , isLoggedIn ,  getAllPosts)

module.exports = router;
