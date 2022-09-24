const { Bookmark } = require("../models/bookmark.model");

const getAllBookmarks = async (req, res, next) => {
  try {
    const { userId } = req;
    const bookmarks = await Bookmark.find({ userId })
      .sort({ createdAt: "desc" })
      .select("-__v");
    res.status(200).json({ success: true, bookmarks });
  } catch (error) {
    next(error);
  }
};

const postBookmark = async (req, res, next) => {
  try {
    const { userId } = req;
    const { postId } = req.body;
    let bookmark = new Bookmark({ userId, postId });
    bookmark = await bookmark.save();
    res.status(201).json({ success: true, bookmark });
  } catch (error) {
    next(error);
  }
};

const deleteBookmark = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    const bookmark = await Bookmark.findOneAndDelete({ postId, userId });
    res.status(200).json({ success: true, bookmark });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllBookmarks, postBookmark, deleteBookmark };
