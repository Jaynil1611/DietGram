import { configureStore } from "@reduxjs/toolkit";
import {
  currentUserReducer,
  notificationsReducer,
  postReducer,
  userReducer,
} from "../features";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    posts: postReducer,
    users: userReducer,
    notifications: notificationsReducer,
  },
});
