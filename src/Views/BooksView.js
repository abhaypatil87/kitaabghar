import React, { useEffect, useState } from "react";
import Books from "../components/Books/Books";
import SearchBar from "../components/SearchBar/SearchBar";
import BookContext from "../Store/book-store";
import { SERVER_PORT, SERVER_URL } from "../utils/bookUtils";
import ViewAsContainer from "../components/ViewAs/ViewAsContainer";

const BooksView = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <BookContext.Provider
      value={{
        books: books,
        filteredBooks: filteredBooks,
        setBooks: setBooks,
        setFilteredBooks: setFilteredBooks,
      }}
    >
      <SearchBar onSearch={searchChangeHandler} />
      <ViewAsContainer />
      <Books />
    </BookContext.Provider>
  );
};

export default BooksView;
