import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { BookType, SearchType } from "../declarations";
import { RootState } from "../Store/store";
import { Books } from "../components/Books";
import { fetchBooks } from "../Store/actions";
import { ScrollToTop } from "../components/common";
import { SearchBar } from "../components/SearchBar";
import ViewAsContainer from "../components/common/ViewAs/ViewAsContainer";
import AlphabeticalFilter from "../components/common/AlphabeticalFilter/AlphabeticalFilter";

const BooksView: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);
  const [searchTerm, setSearchTerm] = useState<string>("all");
  const [searchMode, setSearchMode] = useState<string>("filter");
  const [filteredBooks, setFilteredBooks] = useState<Array<BookType>>(books);
  const dispatch = useDispatch();
  const total = books.length;

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  const searchBooks = useCallback(
    (book: BookType) => {
      if (searchMode === SearchType.SEARCH) {
        return (
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (searchMode === SearchType.FILTER) {
        if (searchTerm === "all") {
          return book;
        } else if (searchTerm === "#") {
          return book.title.match(/^\d/);
        }
        return book.title.toLowerCase().startsWith(searchTerm);
      }
    },
    [searchMode, searchTerm]
  );

  useEffect(() => {
    setFilteredBooks(books.filter(searchBooks));
  }, [books, searchBooks]);

  const searchChangeHandler = (searchMode: string, searchTerm: string) => {
    setSearchMode(searchMode);
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
    <Container maxWidth="lg">
      {renderHelmet()}
      <ScrollToTop showBelow={250} />
      <SearchBar onSearch={searchChangeHandler.bind(null, "search")} />
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
      <AlphabeticalFilter
        value={searchTerm}
        onFilter={searchChangeHandler.bind(null, "filter")}
      />
      <Books books={filteredBooks} />
    </Container>
  );
};

export default BooksView;
