import React, { useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Button, TextField } from "@material-ui/core";

import {
  formsReducer,
  isValidForm,
  onFocusOut,
  onInputChange,
} from "../../utils/formUtil";
import { createBook } from "../../utils/crud";
import { LibAlert, FormError } from "../common";

const useStyles = makeStyles((theme) => ({
  m1: {
    marginTop: theme.spacing(1),
  },
  m2: {
    marginTop: theme.spacing(2),
  },
}));

const initialState = {
  isbn: { value: "", touched: false, hasError: true, error: "" },
  isFormValid: false,
};
const AddBookBySearch = () => {
  const classes = useStyles();
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
      await handleAddBook({ isbn: formState.isbn.value });
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
          <LibAlert
            severity="error"
            className={classes.m1}
            onClose={handleErrorAlertClose}
            message={error}
          />
        )}

        {showSuccess && (
          <LibAlert
            severity="success"
            className={classes.m1}
            onClose={handleSuccessAlertClose}
            message={success}
          />
        )}
        <form
          className={classes.m1}
          onSubmit={(event) => formSubmitHandler(event)}
        >
          <Box component="div">
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
              <FormError error={formState.isbn.error} />
            )}
          </Box>
          <Button
            variant="contained"
            color="primary"
            disabled={isCreating}
            aria-disabled={isCreating}
            disableElevation
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

export default AddBookBySearch;
