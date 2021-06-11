import { configureStore } from "@reduxjs/toolkit";
import { currentUserReducer } from "../features";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
  },
});
