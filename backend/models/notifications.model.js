const mongoose = require("mongoose");
const { Schema } = mongoose;
const { opts } = require("../utils/schemaOptions");

const NotificationSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Like", "New Post", "Follow"],
    },
    isRead: { type: Boolean, default: false },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    originUser: { type: Schema.Types.ObjectId, ref: "User" },
    destinationUser: { type: Schema.Types.ObjectId, ref: "User" },
  },
  opts
);

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = { Notification };
