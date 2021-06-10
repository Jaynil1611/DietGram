const { User } = require("../models/user.model");
const { extend } = require("lodash");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-__v");
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

const getUserDetails = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId).select("-__v");
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

const signUpNewUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const error = newUser.validateSync();
    if (error) {
      return res
        .status(403)
        .json({ success: false, errorMessage: "Validation Failed!" });
    }

    const { email, password } = newUser;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(403)
        .json({ success: false, errorMessage: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    user = newUser;
    user.set("password", newPassword);
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User registration successful" });
  } catch (error) {
    next(error);
  }
};

const updateUserDetails = async (req, res, next) => {
  try {
    const { userId } = req;
    const userUpdates = req.body;
    let user = await User.findById(userId).select("+password -__v");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, errorMessage: "User doesn't exist!" });
    }

    user = extend(user, userUpdates);
    await user.save();
    user.password = undefined;
    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

const getFollowLists = async (req, res, next) => {
  try {
    const { userId } = req;
    const followList = await User.findById(userId)
      .populate("following")
      .populate("followers")
      .select("-__v");
    res.status(200).json({ success: true, followList });
  } catch (error) {
    next(error);
  }
};

const followUser = async (req, res, next) => {
  try {
    const { userId } = req;
    const { userId: followedUserId } = req.body;
    const currentUser = await User.findById(userId).select("-__v");
    const followedUser = await User.findById(followedUserId).select("-__v");
    if (!followedUser) {
      return res
        .status(403)
        .json({ success: false, errorMessage: "User doesn't exist" });
    }

    currentUser.following.push(followedUserId);
    followedUser.followers.push(userId);
    await currentUser.save();
    await followedUser.save();
    res.status(201).json({ success: true, followedUser, user: currentUser });
  } catch (error) {
    next(error);
  }
};

const unfollowUser = async (req, res, next) => {
  try {
    const { userId } = req;
    const { userId: unfollowedUserId } = req.body;
    const currentUser = await User.findById(userId).select("-__v");
    const unfollowedUser = await User.findById(unfollowedUserId).select("-__v");
    if (!unfollowedUser) {
      return res
        .status(403)
        .json({ success: false, errorMessage: "User doesn't exist" });
    }

    currentUser.following.pull(unfollowedUserId);
    unfollowedUser.followers.pull(userId);
    await currentUser.save();
    await unfollowedUser.save();
    res.status(201).json({ success: true, unfollowedUser, user: currentUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserDetails,
  signUpNewUser,
  getAllUsers,
  updateUserDetails,
  getFollowLists,
  followUser,
  unfollowUser,
};
