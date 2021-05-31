import React, { useReducer, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  formsReducer,
  isValidForm,
  onFocusOut,
  onInputChange,
} from "../../utils/formUtil";
import { createBook, prepareBookData } from "../../utils/bookUtils";
import ErrorAlert from "../Alert/ErrorAlert";
import SuccessAlert from "../Alert/SuccessAlert";

const initialState = {
  title: { value: "", touched: false, hasError: true, error: "" },
  subtitle: { value: "", touched: false, hasError: false, error: "" },
  description: { value: "", touched: false, hasError: false, error: "" },
  isbn_10: { value: "", touched: false, hasError: true, error: "" },
  isbn_13: { value: "", touched: false, hasError: true, error: "" },
  author: { value: "", touched: false, hasError: true, error: "" },
  page_count: { value: "", touched: false, hasError: true, error: "" },
  thumbnail_url: { value: "", touched: false, hasError: true, error: "" },
  isFormValid: false,
};

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: theme.spacing(1),
  },
  form: {
    width: "50%",
    marginTop: theme.spacing(1),
  },
  error: {
    marginTop: theme.spacing(1),
    color: "#f65157",
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  formMessage: {
    width: "50%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const AddBookByManualEntry = () => {
  const classes = useStyles();
  const [formState, dispatch] = useReducer(formsReducer, initialState);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("Please enter all the required fields");
  const [success, setSuccess] = useState("");

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isValidForm(formState, dispatch)) {
      setShowError(true);
      setError("Please address all the highlighted errors.");
    } else {
      await handleAddBook(prepareBookData(formState));
    }
  };

  const handleAddBook = async (bookDataObject) => {
    let response = await createBook(bookDataObject);

    response = await response;
    if (response.status === 200) {
      const responseText = await response.text();
      const book = JSON.parse(responseText).data.book;
      setShowSuccess(true);
      setSuccess(`The book '${book.title}' was added into the library`);
    } else {
      const responseText = await response.text();
      setShowError(true);
      setError(responseText);
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
      className={classes.grid}
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
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
      <form
        className={classes.form}
        onSubmit={(event) => formSubmitHandler(event)}
      >
        <Grid item sm={6}>
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
            <div className={classes.error}>{formState.title.error}</div>
          )}
        </Grid>
        <Grid item sm={6}>
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
            <div className={classes.error}>{formState.subtitle.error}</div>
          )}
        </Grid>
        <Grid item sm={6}>
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
              onInputChange("author", event.target.value, dispatch, formState);
            }}
            onBlur={(event) => {
              onFocusOut("author", event.target.value, dispatch, formState);
            }}
          />
          {formState.author.touched && formState.author.hasError && (
            <div className={classes.error}>{formState.author.error}</div>
          )}
        </Grid>
        <Grid item sm={6}>
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
          {formState.description.touched && formState.description.hasError && (
            <div className={classes.error}>{formState.description.error}</div>
          )}
        </Grid>
        <Grid item sm={6}>
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
              onInputChange("isbn_10", event.target.value, dispatch, formState);
            }}
            onBlur={(event) => {
              onFocusOut("isbn_10", event.target.value, dispatch, formState);
            }}
          />
          {formState.isbn_10.touched && formState.isbn_10.hasError && (
            <div className={classes.error}>{formState.isbn_10.error}</div>
          )}
        </Grid>
        <Grid item sm={6}>
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
              onInputChange("isbn_13", event.target.value, dispatch, formState);
            }}
            onBlur={(event) => {
              onFocusOut("isbn_13", event.target.value, dispatch, formState);
            }}
          />
          {formState.isbn_13.touched && formState.isbn_13.hasError && (
            <div className={classes.error}>{formState.isbn_13.error}</div>
          )}
        </Grid>
        <Grid item sm={6}>
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
              onFocusOut("page_count", event.target.value, dispatch, formState);
            }}
          />
          {formState.page_count.touched && formState.page_count.hasError && (
            <div className={classes.error}>{formState.page_count.error}</div>
          )}
        </Grid>
        <Grid item sm={6}>
          <TextField
            autoFocus={true}
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
              <div className={classes.error}>
                {formState.thumbnail_url.error}
              </div>
            )}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className={classes.submitButton}
          type="submit"
          value="Add"
        >
          Add
        </Button>
      </form>
    </Grid>
  );
};

export default AddBookByManualEntry;
