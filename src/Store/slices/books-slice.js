import { createSlice } from "@reduxjs/toolkit";

const initialBooksState = {
  books: [],
};

const booksSlice = createSlice({
  name: "booksSlice",
  initialState: initialBooksState,
  reducers: {
    initiate(state, action) {
      state.books = action.payload;
    },
    update(state, action) {
      state.books = [];
    },
  },
});

export default booksSlice;
