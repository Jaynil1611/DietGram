const mongoose = require("mongoose");
const { Schema } = mongoose;
const { opts } = require("../utils/schemaOptions");
require("mongoose-type-url");

const ReactionSchema = new Schema({
  count: { type: Number, default: 0 },
  reactedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const PostSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, trim: true, required: "Content is required" },
  likes: { type: ReactionSchema, default: { count: 0, reactedUsers: [] } },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
