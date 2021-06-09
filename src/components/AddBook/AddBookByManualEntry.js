import React, { useReducer, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Box, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  CLEAR_FORM,
  initialState,
  formsReducer,
  isValidForm,
  onFocusOut,
  onInputChange,
} from "../../utils/formUtil";
import { createBook } from "../../utils/bookUtils";
import ErrorAlert from "../common/Alert/ErrorAlert";
import SuccessAlert from "../common/Alert/SuccessAlert";
import FormError from "../common/FormError/FormError";

const useStyles = makeStyles((theme) => ({
  m1: {
    marginTop: theme.spacing(1),
  },
  m2: {
    marginTop: theme.spacing(2),
  },
}));

const AddBookByManualEntry = () => {
  const classes = useStyles();
  const [formState, dispatch] = useReducer(formsReducer, initialState);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("Please enter all the required fields");
  const [success, setSuccess] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isValidForm(formState, dispatch)) {
      setShowError(true);
      setError("Please address all the highlighted errors.");
    } else {
      await handleAddBook({
        title: formState.title.value,
        description: formState.description.value,
        subtitle: formState.subtitle.value,
        isbn_10: formState.isbn_10.value,
        isbn_13: formState.isbn_13.value,
        page_count: formState.page_count.value,
        thumbnail_url: formState.thumbnail_url.value,
        author: formState.author.value,
      });
    }
  };

  const handleAddBook = async (bookDataObject) => {
    try {
      setIsCreating(true);
      let response = await createBook(bookDataObject);

      response = await response;
      if (response.status === 200) {
        const responseText = await response.json();
        const book = responseText.data.book;
        setShowSuccess(true);
        setSuccess(`The book '${book.title}' was added into the library`);
        dispatch({
          type: CLEAR_FORM,
          data: formState,
        });
      } else {
        const responseText = await response.text();
        setShowError(true);
        setError(responseText);
      }
    } catch (error) {
      setShowError(true);
      setError(error.message);
    } finally {
      setIsCreating(false);
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
    <Grid
      className={classes.m1}
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={12} sm={12} md={8} lg={6}>
        {showError && (!formState.isFormValid || error.length > 0) && (
          <ErrorAlert
            className={classes.m2}
            onClose={handleErrorAlertClose}
            message={error}
          />
        )}

        {showSuccess && (
          <SuccessAlert
            className={classes.m2}
            onClose={handleSuccessAlertClose}
            message={success}
          />
        )}
        <form
          className={classes.m1}
          onSubmit={(event) => formSubmitHandler(event)}
        >
          <Grid item className={classes.m2}>
            <TextField
              autoFocus={true}
              margin="dense"
              label="Title"
              variant="outlined"
              fullWidth
              type="text"
              name="title"
              id="title"
              value={formState.title.value}
              onChange={(event) => {
                onInputChange("title", event.target.value, dispatch, formState);
              }}
              onBlur={(event) => {
                onFocusOut("title", event.target.value, dispatch, formState);
              }}
            />
            {formState.title.touched && formState.title.hasError && (
              <FormError error={formState.title.error} />
            )}
          </Grid>
          <Grid item className={classes.m2}>
            <TextField
              margin="dense"
              label="Subtitle"
              variant="outlined"
              fullWidth
              type="text"
              name="subtitle"
              id="subtitle"
              value={formState.subtitle.value}
              onChange={(event) => {
                onInputChange(
                  "subtitle",
                  event.target.value,
                  dispatch,
                  formState
                );
              }}
              onBlur={(event) => {
                onFocusOut("subtitle", event.target.value, dispatch, formState);
              }}
            />
            {formState.subtitle.touched && formState.subtitle.hasError && (
              <FormError error={formState.subtitle.error} />
            )}
          </Grid>
          <Grid item className={classes.m2}>
            <TextField
              margin="dense"
              label="Author"
              helperText="Enter in a 'first name last name' manner"
              variant="outlined"
              fullWidth
              type="text"
              name="author"
              id="author"
              value={formState.author.value}
              onChange={(event) => {
                onInputChange(
                  "author",
                  event.target.value,
                  dispatch,
                  formState
                );
              }}
              onBlur={(event) => {
                onFocusOut("author", event.target.value, dispatch, formState);
              }}
            />
            {formState.author.touched && formState.author.hasError && (
              <FormError error={formState.author.error} />
            )}
          </Grid>
          <Grid item className={classes.m2}>
            <TextField
              margin="dense"
              label="Description"
              multiline={true}
              helperText="Maximum 2000 words allowed"
              variant="outlined"
              fullWidth
              type="text"
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
            {formState.description.touched &&
              formState.description.hasError && (
                <FormError error={formState.description.error} />
              )}
          </Grid>
          <Grid item className={classes.m2}>
            <TextField
              margin="dense"
              label="ISBN 10"
              variant="outlined"
              fullWidth
              type="text"
              name="isbn_10"
              id="isbn_10"
              value={formState.isbn_10.value}
              onChange={(event) => {
                onInputChange(
                  "isbn_10",
                  event.target.value,
                  dispatch,
                  formState
                );
              }}
              onBlur={(event) => {
                onFocusOut("isbn_10", event.target.value, dispatch, formState);
              }}
            />
            {formState.isbn_10.touched && formState.isbn_10.hasError && (
              <FormError error={formState.isbn_10.error} />
            )}
          </Grid>
          <Grid item className={classes.m2}>
            <TextField
              margin="dense"
              label="ISBN 13"
              variant="outlined"
              fullWidth
              type="text"
              name="isbn_13"
              id="isbn_13"
              value={formState.isbn_13.value}
              onChange={(event) => {
                onInputChange(
                  "isbn_13",
                  event.target.value,
                  dispatch,
                  formState
                );
              }}
              onBlur={(event) => {
                onFocusOut("isbn_13", event.target.value, dispatch, formState);
              }}
            />
            {formState.isbn_13.touched && formState.isbn_13.hasError && (
              <FormError error={formState.isbn_13.error} />
            )}
          </Grid>
          <Grid item className={classes.m2}>
            <TextField
              margin="dense"
              label="Pages"
              variant="outlined"
              fullWidth
              type="number"
              name="page_count"
              id="page_count"
              value={formState.page_count.value}
              onChange={(event) => {
                onInputChange(
                  "page_count",
                  event.target.value,
                  dispatch,
                  formState
                );
              }}
              onBlur={(event) => {
                onFocusOut(
                  "page_count",
                  event.target.value,
                  dispatch,
                  formState
                );
              }}
            />
            {formState.page_count.touched && formState.page_count.hasError && (
              <Box component="div" className={classes.error}>
                {formState.page_count.error}
              </Box>
            )}
          </Grid>
          <Grid item className={classes.m2}>
            <TextField
              margin="dense"
              label="Thumbnail URL"
              variant="outlined"
              fullWidth
              type="url"
              name="thumbnailurl"
              id="thumbnailurl"
              value={formState.thumbnail_url.value}
              onChange={(event) => {
                onInputChange(
                  "thumbnail_url",
                  event.target.value,
                  dispatch,
                  formState
                );
              }}
              onBlur={(event) => {
                onFocusOut(
                  "thumbnail_url",
                  event.target.value,
                  dispatch,
                  formState
                );
              }}
            />
            {formState.thumbnail_url.touched &&
              formState.thumbnail_url.hasError && (
                <FormError error={formState.thumbnail_url.error} />
              )}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disabled={isCreating}
            aria-disabled={isCreating}
            className={classes.m2}
            type="submit"
            value="Add"
          >
            Add
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddBookByManualEntry;
