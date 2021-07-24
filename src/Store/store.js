import { configureStore } from "@reduxjs/toolkit";
import {
  authors,
  books,
  notifications,
  viewMode,
  apiSettingsSlice,
  authorisationSlice,
} from "./slices";

const store = configureStore({
  reducer: {
    authors: authors.reducer,
    books: books.reducer,
    viewMode: viewMode.reducer,
    notifications: notifications.reducer,
    apiSettings: apiSettingsSlice.reducer,
    authorisation: authorisationSlice.reducer,
  },
});

export const notificationActions = notifications.actions;
export const authorsActions = authors.actions;
export const booksActions = books.actions;
export const viewModeActions = viewMode.actions;
export const apiSettingsActions = apiSettingsSlice.actions;
export const authorisationActions = authorisationSlice.actions;

export default store;
