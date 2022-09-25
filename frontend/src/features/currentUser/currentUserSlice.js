import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storeToken } from "../../utils";
import { showToast } from "../index";
import {
  loginUserService,
  signUpUserService,
  getCurrentUserService,
} from "./currentUserService";

const initialState = {
  currentUser: null,
  status: "idle",
  token: null,
  error: null,
};

export const loginUser = createAsyncThunk(
  "currentUser/loginUser",
  loginUserService
);

export const signUpUser = createAsyncThunk(
  "currentUser/signUpUser",
  signUpUserService
);

export const getCurrentUser = createAsyncThunk(
  "currentUser/getCurrentUser",
  getCurrentUserService
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload.token;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.currentUser = payload.user;
      state.token = payload.token;
      storeToken(payload.token);
      showToast("Login successful", "success");
    },
    [loginUser.rejected]: (state, { payload }) => {
      showToast("User doesn't exist", "error");
    },
    [getCurrentUser.pending]: (state, { payload }) => {
      state.status = "loading";
    },
    [getCurrentUser.fulfilled]: (state, { payload }) => {
      state.currentUser = payload.user;
      state.status = "fulfilled";
    },
    [getCurrentUser.rejected]: (state, { payload }) => {
      state.status = "rejected";
      state.error = payload;
      showToast("Couldn't fetch user details!", "error");
    },
  },
});

export const selectCurrentUserId = ({ currentUser }) =>
  currentUser.currentUser.id;

export const selectCurrentUser = ({ currentUser }) => currentUser.currentUser;

export const getCurrentUserStatus = ({ currentUser }) => currentUser.status;

export const selectToken = ({ currentUser }) => currentUser.token;

export const { setToken } = currentUserSlice.actions;

export default currentUserSlice.reducer;
