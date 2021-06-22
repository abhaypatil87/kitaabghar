import React from "react";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";

import BookTile from "./BookTile";

const Books = () => {
  const books = useSelector((state) => state.books.books);

  return (
    <Box component="div">
      {books.map((book) => (
        <BookTile
          key={book.book_id}
          book_id={book.book_id}
          title={book.title}
          subtitle={book.subtitle}
          thumbnail_url={book.thumbnail_url}
          isbn_10={book.isbn_10}
          isbn_13={book.isbn_13}
          page_count={book.page_count}
          author={book.author}
          description={book.description}
        />
      ))}
    </Box>
  );
};

export default Books;
