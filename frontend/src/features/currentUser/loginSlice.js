import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storeToken } from "../../utils";
import {
  loginUserService,
  signUpUserService,
  getCurrentUserService,
} from "./loginService";

const initialState = {
  currentUser: null,
  status: { currentUser: "idle" },
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
    },
    [getCurrentUser.pending]: (state, { payload }) => {
      state.status.currentUser = "loading";
    },
    [getCurrentUser.fulfilled]: (state, { payload }) => {
      state.currentUser = payload.user;
      state.status.currentUser = "fulfilled";
      state.error = null;
    },
    [getCurrentUser.rejected]: (state, { payload }) => {
      state.status.currentUser = "error";
      state.error = payload;
    },
  },
});

export const { setToken } = currentUserSlice.actions;

export default currentUserSlice.reducer;
