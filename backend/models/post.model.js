const mongoose = require("mongoose");
const { Schema } = mongoose;
const { opts } = require("../utils/schemaOptions");
require("mongoose-type-url");

const reactedUsersSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { toJSON: { virtuals: true } }
);

const ReactionSchema = new Schema({
  count: { type: Number, default: 0 },
  reactedUsers: [reactedUsersSchema],
});

const PostSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    username: { type: String, required: "Username is required" },
    content: { type: String, trim: true, required: "Content is required" },
    likes: { type: ReactionSchema, default: { count: 0, reactedUsers: [] } },
  },
  opts
);

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
