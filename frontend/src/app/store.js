import { configureStore } from "@reduxjs/toolkit";
import {
  currentUserReducer,
  notificationsReducer,
  postReducer,
  userPostReducer,
  userReducer,
} from "../features";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    posts: postReducer,
    users: userReducer,
    userPosts: userPostReducer,
    notifications: notificationsReducer,
  },
});
