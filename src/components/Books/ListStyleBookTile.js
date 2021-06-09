import React, { useContext, useEffect, useReducer, useState } from "react";
import BookContext from "../../Store/book-store";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import bookTitleStyles from "./BookTile.module.css";
import {
  formsReducer,
  isValidForm,
  onFocusOut,
  onInputChange,
} from "../../utils/formUtil";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { deleteBook, updateBook } from "../../utils/bookUtils";
import ErrorAlert from "../Alert/ErrorAlert";
import SuccessAlert from "../Alert/SuccessAlert";

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
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: "10px",
    maxWidth: "100%",
  },
  image: {
    width: 128,
    height: 128,
  },
  hover: {
    cursor: "pointer",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
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
  const { books, setBooks } = useContext(BookContext);
  const [bookState, setBookState] = useState({});
  const classes = useStyles();
  const [formState, dispatch] = useReducer(
    formsReducer,
    getInitialState(props)
  );
  const [editMode, setEditMode] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("Please enter all the required fields");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
        setBooks(books.filter((item) => item.book_id !== props.book_id));
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

  const updateContext = (book) => {
    const updatedBooks = [
      ...books.filter((item) => item.book_id !== props.book_id),
      book,
    ];
    updatedBooks.sort(function (a, b) {
      const nameA = a.title.toUpperCase();
      const nameB = b.title.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    setBooks(updatedBooks);
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

        setBookState({ ...book });
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

  return (
    <Box component="div" className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        {showError && (!formState.isFormValid || error.length > 0) && (
          <ErrorAlert
            className={classes.formMessage}
            onClose={handleErrorAlertClose}
            message={error}
          />
        )}

        {showSuccess && (
          <SuccessAlert
            className={classes.formMessage}
            onClose={handleSuccessAlertClose}
            message={success}
          />
        )}
        <Grid container spacing={2}>
          <Grid item>
            <img src={bookState.thumbnail_url} alt="" />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs>
              {!editMode && (
                <Typography
                  className={`${classes.bookTitle} ${classes.hover}`}
                  gutterBottom
                  variant="h5"
                >
                  {bookState.title}
                </Typography>
              )}
              <Fade in={editMode} timeout={300} unmountOnExit>
                <>
                  <TextField
                    autoFocus={true}
                    margin="dense"
                    label="Title"
                    variant="outlined"
                    type="text"
                    name="title"
                    id="title"
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
                    <div className={classes.error}>{formState.title.error}</div>
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
                <Fade in={editMode} timeout={300} unmountOnExit>
                  <TextField
                    style={{ width: "80%" }}
                    autoFocus={true}
                    margin="dense"
                    label="Description"
                    variant="outlined"
                    type="text"
                    multiline={true}
                    name="description"
                    id="description"
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
            <Grid item>
              <Typography>
                <EditRoundedIcon
                  onClick={enableEdit}
                  className={`${classes.iconButton} ${classes.hover}`}
                />
              </Typography>
              <Typography>
                <DeleteOutlineRoundedIcon
                  className={`${classes.iconButton} ${classes.hover}`}
                  onClick={confirmDeleteBook}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Confirm
        classes={{
          paper: classes.paper,
        }}
        keepMounted
        open={isOpen}
        onClose={cancelDelete}
        onOkay={removeBook}
      />
    </Box>
  );
};

function Confirm(props) {
  const { onClose, onOkay, open, ...other } = props;

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onOkay();
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="book-delete-confirmation-dialog"
      open={open}
      {...other}
    >
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent dividers>
        <Typography>
          This will permanently remove the book from the library. Are you sure?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ListStyleBookTile;