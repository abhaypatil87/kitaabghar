import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@material-ui/core";
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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("all");
  const [searchMode, setSearchMode] = useState<string>("filter");
  const books = useSelector((state: RootState) => state.books.books);
  const [filteredBooks, setFilteredBooks] = useState<Array<BookType>>(books);
  const notification = useSelector(
    (state: RootState) => state.notifications.notification
  );
  const total = books.length;

  useEffect(() => {
    setLoading(true);
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    if (notification !== null) {
      if (notification.lastOp === "GET_BOOKS") {
        setLoading(false);
      }
    }
  }, [notification]);

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
        <title>{`Books | Kitaabghar`}</title>
        <meta
          name="description"
          content={`List of books available in the library`}
        />
      </Helmet>
    );
  };

  return (
    <Container maxWidth="lg">
      <Grid item xs={12} sm={12} md={12} lg={12}>
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
            <Typography variant="body1" tabIndex={0}>
              {total} books
            </Typography>
          </Box>
        </Grid>
        <Grid container>
          <Grid sx={{ display: { xs: "none", sm: "block" } }}>
            <AlphabeticalFilter
              value={searchTerm}
              orientation={"horizontal"}
              onFilter={searchChangeHandler.bind(null, "filter")}
            />
          </Grid>
          <Grid item xs={11} sm={12} md={12} lg={12}>
            {loading ? <LinearProgress /> : <Books books={filteredBooks} />}
          </Grid>
          <Grid
            item
            xs={1}
            sm={12}
            md={12}
            lg={12}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <AlphabeticalFilter
              value={searchTerm}
              orientation={"vertical"}
              onFilter={searchChangeHandler.bind(null, "filter")}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BooksView;
