const mongoose = require("mongoose");
const { Schema } = mongoose;
const { opts } = require("../utils/schemaOptions");

const BookmarkSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  opts
);

const Bookmark = mongoose.model("Bookmark", BookmarkSchema);

module.exports = { Bookmark };
