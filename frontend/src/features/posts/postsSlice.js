import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { showToast } from "../toasts/Toast";
import {
  addPostService,
  deletePostService,
  editPostService,
  getPostsService,
  likeService,
} from "./postsService";

export const getPosts = createAsyncThunk("posts/getPosts", getPostsService);
export const addPost = createAsyncThunk("posts/addPost", addPostService);
export const editPost = createAsyncThunk("posts/editPost", editPostService);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  deletePostService
);
export const updateLikes = createAsyncThunk("posts/updateLikes", likeService);

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postLiked: (state, { payload }) => {
      const { id, count } = payload.post;
      state.entities[id].likes.count = count;
    },
  },
  extraReducers: {
    [getPosts.pending]: (state, { payload }) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      postsAdapter.upsertMany(state, payload.posts);
    },
    [getPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "Unable to fetch posts!";
    },
    [addPost.fulfilled]: (state, { payload }) => {
      postsAdapter.upsertOne(state, payload.post);
      showToast("Post added", "success");
    },
    [editPost.fulfilled]: (state, { payload }) => {
      postsAdapter.upsertOne(state, payload.post);
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      postsAdapter.removeOne(state, payload.post.id);
    },
    [updateLikes.fulfilled]: (state, { payload }) => {
      postsAdapter.upsertOne(state, payload.post);
    },
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export const getPostStatus = (state) => state.posts.status;

export const { postLiked } = postsSlice.actions;

export default postsSlice.reducer;
