import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { BookType } from "../declarations";
import { Books } from "../components/Books";
import { fetchBooks } from "../Store/actions";
import { ScrollToTop } from "../components/common";
import { SearchBar } from "../components/SearchBar";
import ViewAsContainer from "../components/common/ViewAs/ViewAsContainer";
import { RootState } from "../Store/store";

const BooksView = () => {
  const books = useSelector((state: RootState) => state.books.books);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Array<BookType>>(books);
  const dispatch = useDispatch();
  const total = books.length;

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    setFilteredBooks(
      books.filter(
        (book: BookType) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [books, searchTerm]);

  const searchChangeHandler = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const renderHelmet = () => {
    return (
      <Helmet>
        <title>{`Books | Home Library`}</title>
        <meta
          name="description"
          content={`List of books available in the library`}
        />
      </Helmet>
    );
  };

  return (
    <div>
      {renderHelmet()}
      <ScrollToTop showBelow={250} />
      <SearchBar onSearch={searchChangeHandler} />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ViewAsContainer />
        <Box marginLeft={"auto"}>
          <Typography
            variant="body1"
            component="span"
            tabIndex={0}
            aria-label={`${total} total books`}
          >
            {total} books
          </Typography>
        </Box>
      </Grid>
      <Books books={filteredBooks} />
    </div>
  );
};

export default BooksView;
