import React, { useEffect, useReducer, useState } from "react";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import {
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";

import bookTitleStyles from "./BookTile.module.css";
import {
  formsReducer,
  isValidForm,
  onFocusOut,
  onInputChange,
} from "../../utils/formUtil";
import { deleteBook, updateBook, viewState } from "../../utils/crud";
import { FormError, Confirm, SnackBar } from "../common";
import { HeadlineStyleBookTile, ModuleStyleBookTile } from "./index";
import useAlert from "../../utils/hooks/useAlert";

const getInitialState = (props) => {
  return {
    title: { value: props.title, touched: false, hasError: true, error: "" },
    description: {
      value: props.description,
      touched: false,
      hasError: false,
      error: "",
    },
    isFormValid: false,
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: "10px",
    maxWidth: "100%",
  },
  hover: {
    cursor: "pointer",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    width: 128,
    height: 128,
  },
  error: {
    marginTop: theme.spacing(1),
    color: "#f65157",
  },
  bookTitle: {
    "&:hover": {
      color: "#2158d0",
    },
  },
  iconButton: {
    "&:hover": {
      color: "#2158d0",
    },
  },
  formMessage: {
    width: "98%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const ListStyleBookTile = (props) => {
  const [bookState, setBookState] = useState({});
  const [globalDisplayMode, setGlobalDisplayMode] = useState("");
  const classes = useStyles();
  const [formState, dispatch] = useReducer(
    formsReducer,
    getInitialState(props)
  );
  const [editMode, setEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const viewMode = useSelector((state) => state.viewMode.viewMode);
  const books = useSelector((state) => state.books.books);

  const {
    success,
    setSuccess,
    error,
    setError,
    showError,
    setShowError,
    showSuccess,
    setShowSuccess,
  } = useAlert();

  useEffect(() => {
    setBookState({ ...props });
  }, []);

  const enableEdit = () => {
    setEditMode(true);
  };
  const cancelEdit = () => {
    setEditMode(false);
  };

  const confirmDeleteBook = () => {
    setIsOpen(true);
  };

  const cancelDelete = () => {
    setIsOpen(false);
  };

  const removeBook = async () => {
    try {
      const response = await deleteBook(props.book_id);
      const result = await response.json();
      if (result.success) {
        props.onDelete(
          `The book '${props.title}' was removed from the library.`
        );
        // setBooks(books.filter((item) => item.book_id !== props.book_id));
      }
    } catch (error) {
      setError(error.message);
      setShowError(true);
    } finally {
      setIsOpen(false);
    }
  };

  const editClickHandler = async (event) => {
    event.preventDefault();
    if (!isValidForm(formState, dispatch)) {
      setShowError(true);
      setError("Please address all the highlighted errors.");
    } else {
      await handleEditBook({
        book_id: bookState.book_id,
        subtitle: bookState.subtitle,
        isbn_10: bookState.isbn_10,
        isbn_13: bookState.isbn_13,
        page_count: bookState.page_count,
        thumbnail_url: bookState.thumbnail_url,
        title: formState.title.value,
        description: formState.description.value,
      });
    }
  };

  const updateContext = (updatedBook) => {
    // const index = books.findIndex(
    //   (book) => book.book_id === updatedBook.book_id
    // );
    //
    // updatedBook = { ...books[index], ...updatedBook };
    // books[index] = updatedBook;
    // setBooks(books);
  };

  const handleEditBook = async (bookDataObject) => {
    try {
      setIsEditing(true);
      let response = await updateBook(bookDataObject);

      response = await response;
      if (response.status === 200) {
        const responseText = await response.json();
        const book = responseText.data.book;
        updateContext(book);

        const index = books.findIndex((b) => b.book_id === book.book_id);

        setBookState({ ...books[index] });
        setShowSuccess(true);
        setSuccess(`The book '${book.title}' has been updated successfully.`);
      } else {
        const responseText = await response.text();
        setShowError(true);
        setError(responseText);
      }
    } catch (error) {
      setShowError(true);
      setError(error.message);
    } finally {
      setIsEditing(false);
      setEditMode(false);
    }
  };

  const handleErrorAlertClose = () => {
    setShowError(false);
    setError("");
  };

  const handleSuccessAlertClose = () => {
    setShowSuccess(false);
    setSuccess("");
  };

  const titleClickHandler = () => {
    setGlobalDisplayMode(viewMode);
  };
  return globalDisplayMode === viewState.MODULE ? (
    <ModuleStyleBookTile {...props} />
  ) : globalDisplayMode === viewState.HEADLINE ? (
    <HeadlineStyleBookTile {...props} />
  ) : (
    <Box component="article" role={"article"} marginTop={2}>
      <SnackBar
        message={error}
        open={showError}
        severity={"error"}
        onClose={handleErrorAlertClose}
      />
      <SnackBar
        message={success}
        open={showSuccess}
        severity={"success"}
        onClose={handleSuccessAlertClose}
      />
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <img src={bookState.thumbnail_url} alt={props.title} />
            <div>
              <IconButton
                onClick={enableEdit}
                className={`${classes.iconButton} ${classes.hover}`}
                aria-label={"Edit"}
              >
                <EditRoundedIcon />
              </IconButton>
              <IconButton
                className={`${classes.iconButton} ${classes.hover}`}
                onClick={confirmDeleteBook}
                aria-label={"Delete"}
              >
                <DeleteOutlineRoundedIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs>
              {!editMode && (
                <Typography
                  className={`${classes.bookTitle} ${classes.hover}`}
                  variant="h5"
                  onClick={titleClickHandler}
                >
                  {bookState.title}
                </Typography>
              )}
              <Fade in={editMode} timeout={1} unmountOnExit>
                <>
                  <TextField
                    autoFocus={true}
                    margin="dense"
                    label="Title"
                    variant="outlined"
                    type="text"
                    name="title"
                    value={formState.title.value}
                    onChange={(event) => {
                      onInputChange(
                        "title",
                        event.target.value,
                        dispatch,
                        formState
                      );
                    }}
                    onBlur={(event) => {
                      onFocusOut(
                        "title",
                        event.target.value,
                        dispatch,
                        formState
                      );
                    }}
                  />
                  {formState.title.touched && formState.title.hasError && (
                    <FormError error={formState.title.error} />
                  )}
                </>
              </Fade>
              <Typography variant="h6" gutterBottom>
                {bookState.subtitle}
              </Typography>
              <Typography
                variant="subtitle1"
                className={bookTitleStyles.secondaryDetail}
                gutterBottom
              >
                {bookState.author}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                {bookState.page_count} Pages
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>ISBN 13:</strong> {bookState.isbn_13}{" "}
                <strong>ISBN 10:</strong> {bookState.isbn_10}
              </Typography>

              <Box component="div" marginTop={2}>
                {!editMode && (
                  <Typography
                    variant="body1"
                    className={bookTitleStyles.bookDescription}
                  >
                    {bookState.description}
                  </Typography>
                )}
                <Fade in={editMode} timeout={100} unmountOnExit>
                  <TextField
                    style={{ width: "80%" }}
                    autoFocus={true}
                    margin="dense"
                    label="Description"
                    variant="outlined"
                    type="text"
                    multiline={true}
                    name="description"
                    value={formState.description.value}
                    onChange={(event) => {
                      onInputChange(
                        "description",
                        event.target.value,
                        dispatch,
                        formState
                      );
                    }}
                    onBlur={(event) => {
                      onFocusOut(
                        "description",
                        event.target.value,
                        dispatch,
                        formState
                      );
                    }}
                  />
                </Fade>
              </Box>
              <Grid item hidden={!editMode}>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  disabled={isEditing}
                  aria-disabled={isEditing}
                  type="button"
                  value="Edit"
                  size="small"
                  onClick={editClickHandler}
                >
                  Edit
                </Button>
                <Button
                  style={{ marginLeft: "6px" }}
                  size="small"
                  variant="outlined"
                  onClick={cancelEdit}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Confirm
        classes={{
          paper: classes.paper,
        }}
        message={
          "This will permanently remove the book from the library. Are you sure?"
        }
        keepMounted
        open={isOpen}
        onClose={cancelDelete}
        onOkay={removeBook}
      />
    </Box>
  );
};

export default ListStyleBookTile;
