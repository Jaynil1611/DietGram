const { Notification } = require("../models/notifications.model");

const getUserNotifications = async (req, res, next) => {
  try {
    const { userId } = req;
    const { since } = req.query;
    const notifications = await Notification.find({
      destinationUser: userId,
    })
      .where("createdAt")
      .gt(new Date(since))
      .sort("-createdAt")
      .select("-__v");
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserNotifications };
