import React, { useState } from "react";
import { Box, makeStyles } from "@material-ui/core";

import BookTile from "./BookTile";
import { LibAlert } from "../common";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formMessage: {
    width: "98%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Books = () => {
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const books = useSelector((state) => state.books.books);
  const classes = useStyles();

  const deleteBookHandler = (response) => {
    if (response) {
      setMessage(response);
      setShowSuccess(true);
    }
  };

  const handleSuccessAlertClose = () => {
    setShowSuccess(false);
    setMessage("");
  };

  return (
    <Box component="div">
      {showSuccess && (
        <LibAlert
          severity="success"
          className={classes.formMessage}
          onClose={handleSuccessAlertClose}
          message={message}
        />
      )}
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
          onDelete={deleteBookHandler}
        />
      ))}
    </Box>
  );
};

export default Books;
