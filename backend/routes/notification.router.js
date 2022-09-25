const express = require("express");
const {
  getUserNotifications,
} = require("../controllers/notification.controller");
const router = express.Router({ mergeParams: true });
const { authHandler } = require("../middlewares/authHandler");

router.route("/").get(authHandler, getUserNotifications);

module.exports = router;
