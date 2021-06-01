import React, { useReducer, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

import {
  formsReducer,
  isValidForm,
  onFocusOut,
  onInputChange,
} from "../../utils/formUtil";
import BookContext from "../../Store/book-store";
import { createBook, prepareBookData } from "../../utils/bookUtils";
import ErrorAlert from "../Alert/ErrorAlert";
import SuccessAlert from "../Alert/SuccessAlert";

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

const initialState = {
  isbn: { value: "", touched: false, hasError: true, error: "" },
  isFormValid: false,
};
const AddBookBySearch = () => {
  const classes = useStyles();
  const bookContext = useContext(BookContext);
  const [formState, dispatch] = useReducer(formsReducer, initialState);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(
    "Please enter a 10 or 13 digit ISBN value"
  );
  const [success, setSuccess] = useState("");
  const [isCreating, setIsCreating] = useState(false);

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
    try {
      setIsCreating(true);
      let response = await createBook(bookDataObject);

      response = await response;
      if (response.status === 200) {
        const responseText = await response.json();
        const book = responseText.data.book;
        bookContext.books = [...bookContext.books, book];
        setShowSuccess(true);
        setSuccess(`The book '${book.title}' was added into the library`);
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
        <div className="input_wrapper">
          <TextField
            label="ISBN Number"
            variant="outlined"
            fullWidth
            autoFocus
            margin="dense"
            type="text"
            name="isbn"
            id="isbn"
            value={formState.isbn.value}
            onChange={(event) => {
              onInputChange("isbn", event.target.value, dispatch, formState);
            }}
            onBlur={(event) => {
              onFocusOut("isbn", event.target.value, dispatch, formState);
            }}
          />
          {formState.isbn.touched && formState.isbn.hasError && (
            <div className={classes.error}>{formState.isbn.error}</div>
          )}
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={isCreating}
          aria-disabled={isCreating}
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

export default AddBookBySearch;
