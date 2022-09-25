const express = require("express");
const {
  getAllPosts,
  addNewPost,
  updatePost,
  getPost,
  removePost,
  getUsersWhoLikedPost,
  postUsersWhoLikedPost,
  getPostByUserName,
  getUserFeed,
} = require("../controllers/post.controller");
const router = express.Router({ mergeParams: true });
const { authHandler } = require("../middlewares/authHandler");
const { getPostById } = require("../middlewares/paramHandler");

router.route("/").get(authHandler, getAllPosts).post(authHandler, addNewPost);

router.route("/feed").get(authHandler, getUserFeed);

router.route("/user/:username").get(getPostByUserName);

router.param("postId", getPostById);

router
  .route("/:postId")
  .get(authHandler, getPost)
  .post(authHandler, updatePost)
  .delete(authHandler, removePost);

router
  .route("/:postId/likes")
  .get(getUsersWhoLikedPost)
  .post(authHandler, postUsersWhoLikedPost);

module.exports = router;
