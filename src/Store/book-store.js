import React from "react";

const BookContext = React.createContext({
  books: [],
  filteredBooks: [],
  setBooks: () => {},
  setFilteredBooks: () => {},
});

export default BookContext;
