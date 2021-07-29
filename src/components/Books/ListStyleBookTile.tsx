import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Fade,
  Grid,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

import bookTitleStyles from "./BookTile.module.css";
import {
  formsReducer,
  isValidForm,
  onFocusOut,
  onInputChange,
  ALLOWED_DESCRIPTION_LENGTH,
  RESET_FORM,
} from "../../utils/formUtil";
import { SUCCESS, viewState } from "../../utils/crud";
import { FormError, Confirm, SnackBar, WordCounter } from "../common";
import { HeadlineStyleBookTile, ModuleStyleBookTile } from "./index";
import useAlert from "../../utils/hooks/useAlert";
import { createBook, editBook, removeBook } from "../../Store/actions";
import { LibButton } from "../common/LibButton";
import { BookTileProps } from "../../declarations";
import { RootState } from "../../Store/store";

const getInitialState = (props: any) => {
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

const LibraryPaper = styled(Paper)(({ theme }) => ({
  padding: `${theme.spacing(2)}`,
  marginBottom: "10px",
  maxWidth: "100%",
}));

const useStyles = makeStyles(() => ({
  hover: {
    cursor: "pointer",
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
}));

const ListStyleBookTile = (props: BookTileProps) => {
  const currentLocation = useLocation();
  const [globalDisplayMode, setGlobalDisplayMode] = useState("");
  const classes = useStyles();
  const [formState, dispatchForm] = useReducer(
    formsReducer,
    getInitialState(props)
  );
  const [totalCharacters, setTotalCharacters] = useState(
    props.description.length
  );
  const [editMode, setEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books);
  const notification = useSelector(
    (state: RootState) => state.notifications.notification
  );
  const { error, setError, showError, setShowError } = useAlert();

  const pageCount =
    props.page_count === 0
      ? "Page count unavailable"
      : `${props.page_count} Pages`;
  useEffect(() => {
    if (notification !== null) {
      if (notification.lastOp === "EDIT_BOOK") {
        setIsEditing(false);
        if (notification.status === SUCCESS) {
          setEditMode(false);
        }
      }

      if (notification.lastOp === "REMOVE_BOOK") {
        setIsOpen(false);
      }
    }
  }, [notification, books, props]);

  const renderEditControls = () => {
    return (
      <>
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
      </>
    );
  };

  const renderCreateControls = () => {
    return (
      <>
        <IconButton
          onClick={addClickHandler}
          className={`${classes.iconButton} ${classes.hover}`}
          aria-label={"Add"}
        >
          <AddRoundedIcon />
        </IconButton>
      </>
    );
  };

  const renderControls = () => {
    return (
      <div>
        {currentLocation.pathname === "/library/books" && renderEditControls()}
        {currentLocation.pathname === "/library/add-books" &&
          renderCreateControls()}
      </div>
    );
  };

  const addClickHandler = () => {
    dispatch(
      createBook({
        title: props.title,
        description: props.description,
        subtitle: props.subtitle,
        isbn_10: props.isbn_10,
        isbn_13: props.isbn_13,
        page_count: props.page_count,
        thumbnail_url: props.thumbnail_url,
        author: props.author,
      })
    );
  };

  const removeClickHandler = () => {
    if (props.book_id) {
      dispatch(removeBook(parseInt(props.book_id)));
    }
  };

  const editClickHandler = async () => {
    if (!isValidForm(formState, dispatchForm)) {
      setShowError(true);
      setError("Please address all the highlighted errors.");
    } else {
      setIsEditing(true);
      dispatch(
        editBook({
          book_id: props.book_id,
          subtitle: props.subtitle,
          isbn_10: props.isbn_10,
          isbn_13: props.isbn_13,
          page_count: props.page_count,
          thumbnail_url: props.thumbnail_url,
          title: formState.title.value,
          description: formState.description.value,
        })
      );
    }
  };

  /*
   * Utility methods
   */
  const enableEdit = useCallback(() => {
    setEditMode(true);
  }, []);
  const confirmDeleteBook = useCallback(() => {
    setIsOpen(true);
  }, []);
  const cancelDelete = useCallback(() => {
    setIsOpen(false);
  }, []);
  const titleClickHandler = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    if (
      event.type === "click" ||
      (event.type === "keyup" && event.nativeEvent.which === 13)
    ) {
      if (props.viewMode) {
        setGlobalDisplayMode(props.viewMode);
      }
    }
  };
  const cancelEdit = () => {
    setEditMode(false);
    setIsEditing(false);
    setTotalCharacters(props.description.length);
    resetForm();
  };
  const resetForm = () =>
    dispatchForm({
      type: RESET_FORM,
      data: getInitialState(props),
    });
  const handleErrorAlertClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowError(false);
    setError("");
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
      <LibraryPaper elevation={3}>
        <Grid container spacing={2}>
          <Grid item>
            <img src={props.thumbnail_url} alt={formState.title.value} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs>
              {!editMode && (
                <Link
                  sx={{ textDecoration: "none", color: "inherit" }}
                  aria-label={props.title}
                  component="button"
                  variant="body2"
                  onClick={(event) => {
                    titleClickHandler(event);
                  }}
                  onKeyUp={(event) => {
                    titleClickHandler(event);
                  }}
                >
                  <Typography
                    className={`${classes.bookTitle} ${classes.hover}`}
                    variant="h5"
                    component="div"
                    aria-label={`Title: ${props.subtitle}`}
                  >
                    {props.title}
                  </Typography>
                </Link>
              )}
              <Fade in={editMode} timeout={1} unmountOnExit>
                <Box>
                  <TextField
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
                        dispatchForm,
                        formState
                      );
                    }}
                    onBlur={(event) => {
                      onFocusOut(
                        "title",
                        event.target.value,
                        dispatchForm,
                        formState
                      );
                    }}
                  />
                  {formState.title.touched && formState.title.hasError && (
                    <FormError error={formState.title.error} />
                  )}
                </Box>
              </Fade>
              {props.subtitle.length > 0 && (
                <Typography variant="h6" gutterBottom tabIndex={0}>
                  {props.subtitle}
                </Typography>
              )}
              <Typography
                variant="subtitle1"
                className={bookTitleStyles.secondaryDetail}
                gutterBottom
                tabIndex={0}
              >
                {props.author}
              </Typography>

              <Typography variant="body2" color="textSecondary" tabIndex={0}>
                {pageCount}
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
                    tabIndex={0}
                  >
                    {props.description}
                  </Typography>
                )}
                <Fade in={editMode} timeout={100} unmountOnExit>
                  <Box>
                    <TextField
                      style={{ width: "80%" }}
                      margin="dense"
                      label="Description"
                      variant="outlined"
                      helperText={`Maximum ${ALLOWED_DESCRIPTION_LENGTH} characters allowed`}
                      type="text"
                      multiline={true}
                      name="description"
                      value={formState.description.value}
                      onChange={(event) => {
                        setTotalCharacters(event.target.value.length);
                        onInputChange(
                          "description",
                          event.target.value,
                          dispatchForm,
                          formState
                        );
                      }}
                      onBlur={(event) => {
                        onFocusOut(
                          "description",
                          event.target.value,
                          dispatchForm,
                          formState
                        );
                      }}
                    />
                    <WordCounter
                      maximum={ALLOWED_DESCRIPTION_LENGTH}
                      current={totalCharacters}
                    />
                  </Box>
                </Fade>
              </Box>
              <Grid item hidden={!editMode}>
                <LibButton
                  variant="contained"
                  color="primary"
                  disableElevation
                  disabled={isEditing}
                  aria-disabled={isEditing}
                  value="Edit"
                  size="small"
                  onClick={editClickHandler}
                >
                  Edit
                </LibButton>
                <LibButton
                  style={{ marginLeft: "6px" }}
                  onClick={cancelEdit}
                  size="small"
                  variant={"outlined"}
                >
                  Cancel
                </LibButton>
              </Grid>
              <Grid item hidden={editMode}>
                {renderControls()}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LibraryPaper>
      <Confirm
        message={
          "This will permanently remove the book from the library. Are you sure?"
        }
        keepMounted={false}
        open={isOpen}
        onClose={cancelDelete}
        onOkay={removeClickHandler}
      />
    </Box>
  );
};

export default ListStyleBookTile;
