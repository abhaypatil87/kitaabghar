import React from "react";

const BookContext = React.createContext({
  books: [],
  filteredBooks: [],
  setBooks: () => {},
  setFilteredBooks: () => {},
  viewAs: "grid",
  setViewAs: () => {},
});

export default BookContext;
