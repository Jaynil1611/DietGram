import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getUserPostsByNameService } from "./postsService";

export const getUserPostsByName = createAsyncThunk(
  "userPosts/loadPosts",
  getUserPostsByNameService
);

const userPostsAdapter = createEntityAdapter({
  selectId: (post) => post.username,
  sortComparer: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
});

const initialState = userPostsAdapter.getInitialState({
  status: "idle",
  error: null,
});

const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserPostsByName.pending]: (state, { payload }) => {
      state.status = "loading";
    },
    [getUserPostsByName.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      userPostsAdapter.upsertMany(state, payload.posts);
    },
    [getUserPostsByName.rejected]: (state, { payload }) => {
      state.status = "rejected";
      state.error = payload.errorMessage;
    },
  },
});

export const {
  selectAll: selectAllUserPosts,
  selectById: selectUserPostByName,
  selectIds: selectUserNames,
} = userPostsAdapter.getSelectors((state) => state.posts);

// export const { postLiked } = userPostsSlice.actions;

export default userPostsSlice.reducer;
