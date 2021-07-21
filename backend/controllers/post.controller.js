const { Post } = require("../models/post.model");
const { extend } = require("lodash");
const { User } = require("../models/user.model");
const { Notification } = require("../models/notifications.model");

const getUserFeed = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(403)
        .json({ success: false, errorMessage: "User doesn't exist!" });
    }

    let feed = [];
    await user.following.slice(-5).forEach(async (id) => {
      const posts = await Post.find({ userId: id })
        .limit(5)
        .sort({ createdAt: "desc" });
      feed = [...posts, ...feed];
    });
    const userPosts = await Post.find({ userId })
      .limit(5)
      .sort({ createdAt: "desc" });
    feed = feed.concat(userPosts);
    res.status(200).json({ success: true, posts: feed });
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const { userId } = req;
    const posts = await Post.find({ userId })
      .sort({ createdAt: "desc" })
      .select("-__v");
    res.status(200).json({ success: true, posts });
  } catch (error) {
    next(error);
  }
};

const createNotificationsForNewPost = async (postId, userId) => {
  try {
    const newNotification = {
      type: "New Post",
      postId,
      originUser: userId,
    };
    const { followers } = await User.findById(userId).select("followers");
    const notifications = followers.map((followerId) => ({
      ...newNotification,
      destinationUser: followerId,
    }));
    Notification.insertMany(notifications);
  } catch (error) {
    return new Error("New Post notification failed!");
  }
};

const addNewPost = async (req, res, next) => {
  try {
    const { userId } = req;
    const newPost = new Post({ ...req.body, userId });
    post = await newPost.save();
    res.status(201).json({ success: true, post });
    createNotificationsForNewPost(post._id, userId);
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    let { post } = req;
    res.status(200).json({ success: true, post });
  } catch (error) {
    next(error);
  }
};

const getPostByUserName = async (req, res, next) => {
  try {
    const { username } = req.body;
    const posts = await Post.find({ username });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const postUpdates = req.body;
    let { post } = req;
    post = extend(post, postUpdates);
    post = await post.save();
    res.status(201).json({ success: true, post });
  } catch (error) {
    next(error);
  }
};

const removePost = async (req, res, next) => {
  try {
    const { post } = req;
    await post.delete();
    res.status(200).json({ success: true, post: { id: post._id } });
  } catch (error) {
    next(error);
  }
};

const getUsersWhoLikedPost = async (req, res, next) => {
  try {
    let { post } = req;
    post = await post.populate({ path: "likes.reactedUsers" }).execPopulate();
    res
      .status(200)
      .json({ success: true, post: { id: post._id, likes: post.likes } });
  } catch (error) {
    next(error);
  }
};

const postUsersWhoLikedPost = async (req, res, next) => {
  try {
    let { post } = req;
    const { userId } = req;
    const user =
      post.likes.reactedUsers.length > 0
        ? post.likes.reactedUsers.id(userId)
        : false;
    if (user) {
      let prevCount = post.likes.count;
      post.likes.count = prevCount > 0 ? prevCount - 1 : 0;
      post.likes.reactedUsers.id(userId).remove();
      post = await post.save();
      return res
        .status(201)
        .json({ success: true, post: { id: post._id, likes: post.likes } });
    }
    post.likes.count += 1;
    post.likes.reactedUsers.push({ _id: userId });
    post = await post.save();
    res
      .status(200)
      .json({ success: true, post: { id: post._id, likes: post.likes } });
    if (post.userId.toString() !== userId) {
      createNotificationForLike(post, userId);
    }
  } catch (error) {
    next(error);
  }
};

const createNotificationForLike = async (post, userId) => {
  try {
    const newNotification = {
      type: "Like",
      postId: post._id,
      originUser: userId,
      destinationUser: post.userId,
    };
    Notification.create(newNotification);
  } catch (error) {
    return new Error("Like notification failed!");
  }
};

module.exports = {
  getAllPosts,
  addNewPost,
  getPost,
  updatePost,
  removePost,
  getUsersWhoLikedPost,
  postUsersWhoLikedPost,
  getPostByUserName,
  getUserFeed,
};
