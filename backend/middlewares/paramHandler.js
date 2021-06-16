const { Post } = require("../models/post.model");

const getPostById = async (req, res, next, postId) => {
  try {
    const post = await Post.findById(postId).select("-__v");
    if (!post) {
      return res
        .status(400)
        .json({ success: false, message: "Post not found!" });
    }

    req.post = post;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Couldn't retrieve the post",
      errorMessage: error.message,
    });
  }
};

module.exports = { getPostById };
