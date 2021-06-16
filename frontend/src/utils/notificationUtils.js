import { IoMdHeart, MdAccountCircle, MdNotifications } from "react-icons/all";

export const getIcon = (type) =>
  type === "Like"
    ? IoMdHeart
    : type === "New Post"
    ? MdNotifications
    : MdAccountCircle;

export const getText = (type) =>
  type === "Like"
    ? "liked your post"
    : type === "New Post"
    ? "created a new post"
    : "followed you";

export const getColor = (type) =>
  type === "Like" ? "accent.600" : "accent.300";