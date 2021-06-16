import React from "react";
import { viewState } from "../utils/crud";

const BookContext = React.createContext({
  books: [],
  filteredBooks: [],
  setBooks: () => {},
  setFilteredBooks: () => {},
  viewAs: viewState.MODULE,
  setViewAs: () => {},
});

export default BookContext;
