const express = require("express");
const router = express.Router({ mergeParams: true });
const { authHandler } = require("../middlewares/authHandler");
const {
  getUserDetails,
  signUpNewUser,
  getAllUsers,
  updateUserDetails,
  getFollowLists,
  followUser,
  unfollowUser,
} = require("../controllers/user.controller");

router.route("/").get(getAllUsers).post(signUpNewUser);

router
  .route("/user")
  .get(authHandler, getUserDetails)
  .post(authHandler, updateUserDetails);

router.route("/user/follow").post(authHandler, followUser);

router.route("/:userId/follow").get(authHandler, getFollowLists);

router.route("/user/unfollow").post(authHandler, unfollowUser);

module.exports = router;
