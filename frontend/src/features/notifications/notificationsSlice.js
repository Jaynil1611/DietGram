import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getNotificationsService } from "./notificationsService";

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  getNotificationsService
);

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = notificationsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    refreshNotifications: (state, action) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: {
    [getNotifications.pending]: (state, { payload }) => {
      state.status = "loading";
    },
    [getNotifications.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      notificationsAdapter.upsertMany(state, payload.notifications);
    },
  },
});

export const getNotificationsStatus = ({ notifications }) =>
  notifications.status;

export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors((state) => state.notifications);

export const { refreshNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
