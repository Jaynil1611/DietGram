const express = require("express");
const {
  getAllBookmarks,
  postBookmark,
  deleteBookmark,
} = require("../controllers/bookmark.controller");
const router = express.Router({ mergeParams: true });
const { authHandler } = require("../middlewares/authHandler");

router.use(authHandler);

router.route("/").get(getAllBookmarks).post(postBookmark);

router.route("/:postId").delete(deleteBookmark);

module.exports = router;
