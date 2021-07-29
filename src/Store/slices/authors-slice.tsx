import { createSlice } from "@reduxjs/toolkit";
import { AuthorType } from "../../declarations";

const initialAuthorsState = {
  authors: [] as AuthorType[],
};

const authorsSlice = createSlice({
  name: "authorsSlice",
  initialState: initialAuthorsState,
  reducers: {
    initiate(state, action) {
      state.authors = action.payload.data.authors;
    },

    edit(state, action) {
      const updatedAuthor = action.payload.data;
      const existingAuthor = state.authors.find(
        (author) => author.author_id === updatedAuthor.author_id
      );

      if (existingAuthor) {
        existingAuthor.first_name = updatedAuthor.first_name;
        existingAuthor.last_name = updatedAuthor.last_name;
      }
    },
  },
});

export default authorsSlice;
