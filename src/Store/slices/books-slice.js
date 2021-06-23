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
      const updatedBook = action.payload;
      const existingBook = state.books.find(
        (book) => book.book_id === updatedBook.book_id
      );

      existingBook.title = updatedBook.title;
      existingBook.subtitle = updatedBook.subtitle;
      existingBook.isbn_10 = updatedBook.isbn_10;
      existingBook.isbn_13 = updatedBook.isbn_13;
      existingBook.page_count = updatedBook.page_count;
      existingBook.thumbnail_url = updatedBook.thumbnail_url;
      existingBook.description = updatedBook.description;
    },
    remove(state, action) {
      const removedBookId = action.payload;
      state.books = state.books.filter(
        (book) => book.book_id !== removedBookId
      );
    },
    create(state, action) {
      state.books.push(action.payload);
    },
  },
});

export default booksSlice;
