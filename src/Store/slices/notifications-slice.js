import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { notification: null },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        ...action.payload,
      };
    },
    clearNotifications(state) {
      state.notification = null;
    },
  },
});

export const notificationsActions = notificationsSlice.actions;

export default notificationsSlice;
