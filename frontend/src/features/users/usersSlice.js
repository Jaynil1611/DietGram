import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { showToast } from "../index";
import {
  followUserService,
  getFollowService,
  getUsersService,
  unfollowUserService,
  updateUserService,
} from "./userService";

export const getUsers = createAsyncThunk("users/getUsers", getUsersService);

export const followUser = createAsyncThunk(
  "users/followUser",
  followUserService
);

export const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  unfollowUserService
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  updateUserService
);

export const getFollow = createAsyncThunk("users/getFollow", getFollowService);

const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
});

const initialState = usersAdapter.getInitialState({
  status: "idle",
  followStatus: "idle",
  error: null,
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearFollowStatus: (state, { payload }) => {
      state.followStatus = "idle";
    },
  },
  extraReducers: {
    [getUsers.pending]: (state, { payload }) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      usersAdapter.upsertMany(state, payload.users);
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.status = "rejected";
      showToast("Couldn't fetch users", "error");
    },
    [followUser.fulfilled]: (state, { payload }) => {
      usersAdapter.upsertOne(state, payload.user);
      usersAdapter.upsertOne(state, payload.followedUser);
    },
    [followUser.rejected]: (state, { payload }) => {
      showToast("Couldn't follow user", "error");
    },
    [unfollowUser.fulfilled]: (state, { payload }) => {
      usersAdapter.upsertOne(state, payload.user);
      usersAdapter.upsertOne(state, payload.unfollowedUser);
    },
    [unfollowUser.rejected]: (state, { payload }) => {
      showToast("Couldn't unfollow user", "error");
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      usersAdapter.upsertOne(state, payload.user);
    },
    [updateUser.rejected]: (state, { payload }) => {
      showToast("Couldn't update user details", "error");
    },
    [getFollow.pending]: (state, { payload }) => {
      state.followStatus = "loading";
    },
    [getFollow.fulfilled]: (state, { payload }) => {
      state.followStatus = "fulfilled";
      usersAdapter.upsertOne(state, payload.followList);
    },
    [getFollow.rejected]: (state, { payload }) => {
      showToast("Couldn't fetch follow details", "error");
    },
  },
});

export const { clearFollowStatus } = usersSlice.actions;

export const getUsersStatus = ({ users }) => users.status;

export const getFollowStatus = ({ users }) => users.followStatus;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => state.users);

export const selectUserSuggestions = createSelector(
  [selectAllUsers, (state, currentUserId) => currentUserId],
  (users, currentUserId) => users.filter((user) => user.id !== currentUserId)
);

export const selectUserByName = createSelector(
  [selectAllUsers, (state, username) => username],
  (users, username) =>
    users.filter((user) => user.username === username).slice(0, 5)
);

export default usersSlice.reducer;
