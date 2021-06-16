import React, { useEffect, useState } from "react";
import Books from "../components/Books/Books";
import SearchBar from "../components/SearchBar/SearchBar";
import BookContext from "../Store/book-store";
import { SERVER_PORT, SERVER_URL } from "../utils/crud";
import ViewAsContainer from "../components/common/ViewAs/ViewAsContainer";
import { viewState as view } from "../utils/crud";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 10px 10px 10px",
  },
}));

const BooksView = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewAs, setViewAs] = useState(view.MODULE);
  const classes = useStyles();

  useEffect(() => {
    const fetchAllBooks = async () => {
      let response = await fetch(
        `http://${SERVER_URL}:${SERVER_PORT}/api/books`
      );
      response = await response.json();
      setBooks(response.data.books);
    };
    fetchAllBooks();
  }, []);

  useEffect(() => {
    //TODO: issues/4
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const searchChangeHandler = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const viewAsChangeHandler = (event) => {
    setViewAs(event);
  };

  return (
    <BookContext.Provider
      value={{
        books: books,
        filteredBooks: filteredBooks,
        setBooks: setBooks,
        setFilteredBooks: setFilteredBooks,
        viewAs: viewAs,
        setViewAs: setViewAs,
      }}
    >
      <Box component="div" className={classes.root}>
        <SearchBar onSearch={searchChangeHandler} />
        <ViewAsContainer onViewAs={viewAsChangeHandler} />
        <Books />
      </Box>
    </BookContext.Provider>
  );
};

export default BooksView;
