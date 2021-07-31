import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { showToast } from "../index";
import {
  deleteBookmarkService,
  getBookmarksService,
  postBookmarkService,
} from "./bookmarkService";

export const getBookmarks = createAsyncThunk(
  "bookmarks/getBookmarks",
  getBookmarksService
);

export const postBookmark = createAsyncThunk(
  "bookmarks/postBookmark",
  postBookmarkService
);

export const deleteBookmark = createAsyncThunk(
  "bookmarks/deleteBookmark",
  deleteBookmarkService
);

const bookmarksAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = bookmarksAdapter.getInitialState({
  status: "idle",
  error: null,
});

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  extraReducers: {
    [getBookmarks.pending]: (state, { payload }) => {
      state.status = "loading";
    },
    [getBookmarks.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      bookmarksAdapter.upsertMany(state, payload.bookmarks);
    },
    [getBookmarks.rejected]: (state, { payload }) => {
      state.status = "rejected";
      showToast("Failed to fetch bookmarks", "error");
    },
    [postBookmark.fulfilled]: (state, { payload }) => {
      bookmarksAdapter.upsertOne(state, payload.bookmark);
    },
    [postBookmark.rejected]: (state, { payload }) => {
      showToast("Failed to bookmark", "error");
    },
    [deleteBookmark.fulfilled]: (state, { payload }) => {
      bookmarksAdapter.removeOne(state, payload.bookmark.id);
    },
    [deleteBookmark.rejected]: (state, { payload }) => {
      showToast("Failed to bookmark", "error");
    },
  },
});

export const {
  selectAll: selectAllBookmarks,
  selectById: selectBookmarkById,
  selectIds: selectBookmarkIds,
} = bookmarksAdapter.getSelectors((state) => state.bookmarks);

export const getBookmarkStatus = ({ bookmarks }) => bookmarks.status;

export default bookmarkSlice.reducer;
