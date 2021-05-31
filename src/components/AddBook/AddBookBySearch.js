import React, { useReducer, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import {
  onFocusOut,
  onInputChange,
  UPDATE_FORM,
  validateInput,
} from "../../utils/formUtil";
import BookContext from "../../Store/book-store";

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

const formsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const {
        name,
        value,
        hasError,
        error,
        touched,
        isFormValid,
      } = action.data;
      return {
        ...state,
        [name]: { ...state[name], value, hasError, error, touched },
        isFormValid,
      };
    default:
      return state;
  }
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

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    let isFormValid = true;
    for (const name in formState) {
      const item = formState[name];
      const { value } = item;
      const { hasError, error } = validateInput(name, value);
      if (hasError) {
        isFormValid = false;
      }
      if (name) {
        dispatch({
          type: UPDATE_FORM,
          data: {
            name,
            value,
            hasError,
            error,
            touched: true,
            isFormValid,
          },
        });
      }
    }
    if (!isFormValid) {
      setShowError(true);
      setError("Please address all the shown errors.");
    } else {
      await handleAddBook();
    }
  };

  const handleAddBook = async () => {
    let response = await fetch("http://localhost:4000/api/books", {
      method: "POST",
      body: JSON.stringify({ isbn: formState.isbn.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response;
    if (response.status === 200) {
      const responseText = await response.text();
      const book = JSON.parse(responseText).data.book;
      bookContext.books = [...bookContext.books, book];
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
        <Alert
          severity="error"
          className={classes.formMessage}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleErrorAlertClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      )}

      {showSuccess && (
        <Alert
          severity="success"
          className={classes.formMessage}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleSuccessAlertClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {success}
        </Alert>
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
