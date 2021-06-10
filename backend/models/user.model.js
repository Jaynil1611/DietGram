const mongoose = require("mongoose");
const { Schema } = mongoose;
const { opts } = require("../utils/schemaOptions");
require("mongoose-type-url");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      unique: true,
      trim: true,
      immutable: true,
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
      trim: true,
      immutable: true,
      validate: {
        validator: function (email) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/g.test(email);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      trim: true,
      select: false,
      required: "Password is required",
      validate: {
        validator: function (value) {
          return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/g.test(value);
        },
        message: () =>
          `Password should contain atleast 6 characters (one number & one letter)`,
      },
    },
    firstname: { type: String, trim: true, required: "First name is required" },
    lastname: { type: String, trim: true, required: "Last name is required" },
    bio: { type: String, trim: true },
    url: { type: mongoose.SchemaTypes.Url, trim: true },
    location: { type: String, trim: true },
    profile_image_url: { type: mongoose.SchemaTypes.Url, trim: true },
    cover_image_url: { type: mongoose.SchemaTypes.Url, trim: true },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  opts
);

UserSchema.virtual("fullname").get(function () {
  return this.firstname + " " + this.lastname;
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
