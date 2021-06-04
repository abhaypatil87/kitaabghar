import bookTitleStyles from "./BookTile.module.css";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import React, { useReducer, useState } from "react";
import {
  formsReducer,
  isValidForm,
  onFocusOut,
  onInputChange,
} from "../../utils/formUtil";
import TextField from "@material-ui/core/TextField";
import { Button, Fade, Grid, makeStyles, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { updateBook } from "../../utils/bookUtils";
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
    margin: "10px",
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

const ExpandedBookTile = (props) => {
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

  const enableEdit = () => {
    setEditMode(true);
  };
  const confirmDeleteBook = () => {};
  const deleteBook = () => {};

  const cancelEdit = () => {
    setEditMode(false);
  };

  const editClickHandler = async (event) => {
    event.preventDefault();
    if (!isValidForm(formState, dispatch)) {
      setShowError(true);
      setError("Please address all the highlighted errors.");
    } else {
      await handleEditBook({
        book_id: props.book_id,
        subtitle: props.subtitle,
        isbn_10: props.isbn_10,
        isbn_13: props.isbn_13,
        page_count: props.page_count,
        thumbnail_url: props.thumbnail_url,
        title: formState.title.value,
        description: formState.description.value,
      });
    }
  };

  const handleEditBook = async (bookDataObject) => {
    try {
      setIsEditing(true);
      let response = await updateBook(bookDataObject);

      response = await response;
      if (response.status === 200) {
        const responseText = await response.json();
        const book = responseText.data.book;
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
    <div className={classes.root}>
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
            <img src={props.thumbnail_url} alt="" />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs>
              {!editMode && (
                <Typography
                  className={`${classes.bookTitle} ${classes.hover}`}
                  gutterBottom
                  variant="h5"
                  onClick={props.onClick}
                >
                  {props.title}
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
                {props.subtitle}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {props.author}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                {props.page_count} Pages
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>ISBN 13:</strong> {props.isbn_13}{" "}
                <strong>ISBN 10:</strong> {props.isbn_10}
              </Typography>

              <Box component="div" marginTop={2}>
                {!editMode && (
                  <Typography
                    variant="body1"
                    className={bookTitleStyles.bookDescription}
                  >
                    {props.description}
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
              <Typography variant="subtitle1">
                <EditRoundedIcon
                  onClick={enableEdit}
                  className={`${classes.iconButton} ${classes.hover}`}
                />
              </Typography>
              <Typography variant="subtitle1">
                <DeleteOutlineRoundedIcon
                  className={`${classes.iconButton} ${classes.hover}`}
                  onClick={confirmDeleteBook}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ExpandedBookTile;
