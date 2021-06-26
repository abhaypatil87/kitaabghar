import React, { useEffect, useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Button, TextField } from "@material-ui/core";

import {
  formsReducer,
  isValidForm,
  onFocusOut,
  onInputChange,
  RESET_FORM,
} from "../../utils/formUtil";
import { SUCCESS } from "../../utils/crud";
import { FormError, SnackBar } from "../common";
import useAlert from "../../utils/hooks/useAlert";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../Store/actions";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "40rem",
  },
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
const IsbnSearchCreate = () => {
  const [formState, dispatchForm] = useReducer(formsReducer, initialState);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notifications.notification);
  const classes = useStyles();
  const [error, setError] = useState(
    "Please enter a 10 or 13 digit ISBN value"
  );
  const [isCreating, setIsCreating] = useState(false);
  const { showError, setShowError } = useAlert();

  useEffect(() => {
    setIsCreating(false);
    if (notification !== null) {
      if (notification.lastOp === "ADD_BOOK") {
        if (notification.status === SUCCESS) {
          dispatchForm({
            type: RESET_FORM,
            data: initialState,
          });
        }
      }
    }
  }, [notification]);
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isValidForm(formState, dispatchForm)) {
      setShowError(true);
      setError("Please address all the highlighted errors.");
    } else {
      setIsCreating(true);
      dispatch(createBook({ isbn: formState.isbn.value }));
    }
  };

  const handleErrorAlertClose = () => {
    setShowError(false);
    setError("");
  };

  return (
    <Grid
      className={classes.m1}
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <SnackBar
        message={error}
        open={showError}
        severity={"error"}
        onClose={handleErrorAlertClose}
      />
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <form
          className={`${classes.m1} ${classes.form}`}
          onSubmit={(event) => formSubmitHandler(event)}
        >
          <Box component="div">
            <TextField
              label="ISBN Number"
              variant="outlined"
              fullWidth
              margin="dense"
              type="text"
              name="isbn"
              id="isbn"
              value={formState.isbn.value}
              onChange={(event) => {
                onInputChange(
                  "isbn",
                  event.target.value,
                  dispatchForm,
                  formState
                );
              }}
              onBlur={(event) => {
                onFocusOut("isbn", event.target.value, dispatchForm, formState);
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

export default IsbnSearchCreate;
