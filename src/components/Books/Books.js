import React, { useContext, useEffect, useState } from "react";
import BookTile from "./BookTile";
import BookContext from "../../Store/book-store";
import Box from "@material-ui/core/Box";
import SuccessAlert from "../Alert/SuccessAlert";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formMessage: {
    width: "98%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  root: {
    padding: "10px 10px 10px 10px",
  },
}));

const Books = () => {
  const classes = useStyles();

  const { filteredBooks } = useContext(BookContext);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // This hook has been kept here intentionally
    // This hook will be called whenever a book is edited or deleted
  }, [filteredBooks]);

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
    <Box component="div" className={classes.root}>
      {showSuccess && (
        <SuccessAlert
          className={classes.formMessage}
          onClose={handleSuccessAlertClose}
          message={message}
        />
      )}
      {filteredBooks.map((book) => (
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
