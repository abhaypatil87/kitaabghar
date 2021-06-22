import { configureStore } from "@reduxjs/toolkit";
import { authors, books, notifications, viewMode } from "./slices";

const store = configureStore({
  reducer: {
    authors: authors.reducer,
    books: books.reducer,
    viewMode: viewMode.reducer,
    notifications: notifications.reducer,
  },
});

export const notificationActions = notifications.actions;
export const authorsActions = authors.actions;
export const booksActions = books.actions;
export const viewModeActions = viewMode.actions;

export default store;
