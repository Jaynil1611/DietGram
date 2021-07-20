import {
  BiHomeCircle,
  BiUser,
  BiBookmark,
  BiLogOut,
  MdNotificationsNone,
} from "react-icons/all";

export const menuList = [
  { name: "Home", path: "/", icon: BiHomeCircle },
  {
    name: "Notifications",
    path: "/notifications",
    icon: MdNotificationsNone,
  },
  { name: "Bookmarks", path: "/bookmarks", icon: BiBookmark },
  { name: "Profile", path: "/profile", icon: BiUser },
  { name: "Logout", path: "/logout", icon: BiLogOut },
];
