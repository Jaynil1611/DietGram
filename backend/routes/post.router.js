const express = require("express");
const {
  getAllPosts,
  addNewPost,
  updatePost,
  getPost,
  removePost,
  getUsersWhoLikedPost,
  postUsersWhoLikedPost,
} = require("../controllers/post.controller");
const router = express.Router({ mergeParams: true });
const { authHandler } = require("../middlewares/authHandler");
const { getPostById } = require("../middlewares/paramHandler");

router.route("/").get(authHandler, getAllPosts).post(authHandler, addNewPost);

router.param("postId", getPostById);

router
  .route("/:postId")
  .get(authHandler, getPost)
  .post(authHandler, updatePost)
  .delete(authHandler, removePost);

router
  .route("/:postId/likes")
  .get(getUsersWhoLikedPost)
  .post(postUsersWhoLikedPost);

module.exports = router;
