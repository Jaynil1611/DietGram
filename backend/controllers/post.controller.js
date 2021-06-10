const { Post } = require("../models/post.model");
const { extend } = require("lodash");

const getAllPosts = async (req, res, next) => {
  try {
    const { userId } = req;
    const posts = await Post.find({ userId })
      .sort({ createdAt: "desc" })
      .populate("userId")
      .select("-__v");
    res.status(200).json({ success: true, posts });
  } catch (error) {
    next(error);
  }
};

const addNewPost = async (req, res, next) => {
  try {
    const { userId } = req;
    const newPost = new Post({ ...req.body, userId });
    let post = await Post.findById(newPost._id);
    if (post) {
      return res
        .status(403)
        .json({ success: false, errorMessage: "Post already exist!" });
    }

    post = await newPost.save();
    post = await post.populate("userId").execPopulate();
    res.status(201).json({ success: true, post });
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
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const getUsersWhoLikedPost = async (req, res, next) => {
  try {
    let { post } = req;
    post = await post.populate({ path: "likes.reactedUsers" });
    const likes = post.likes;
    res.status(200).json({ success: true, likes });
  } catch (error) {
    next(error);
  }
};

const postUsersWhoLikedPost = async (req, res, next) => {
  try {
    let { post } = req;
    const { userId } = req;
    const user = post.likes.reactedUsers.id(userId);
    if (user) {
      post.likes.count -= 1;
      post.likes.reactedUsers.id(userId).remove();
      await post.save();
      return res.status(201).json({ success: true, likes: post.likes });
    }
    post.likes.count += 1;
    post.likes.reactedUsers.push(userId);
    await post.save();
    res.status(200).json({ success: true, likes: post.likes });
  } catch (error) {
    next(error);
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
};
