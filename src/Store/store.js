import { configureStore } from "@reduxjs/toolkit";
import { authorsSlice, booksSlice, viewModeSlice } from "./slices";

const store = configureStore({
  reducer: {
    authors: authorsSlice.reducer,
    books: booksSlice.reducer,
    viewMode: viewModeSlice.reducer,
  },
});

export const authorsActions = authorsSlice.actions;
export const booksActions = booksSlice.actions;
export const viewModeActions = viewModeSlice.actions;

export default store;
