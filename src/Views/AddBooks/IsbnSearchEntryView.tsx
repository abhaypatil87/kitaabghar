import React, { FormEvent, useEffect, useReducer, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Box, TextField } from "@material-ui/core";

import {
  formsReducer,
  isValidForm,
  onFocusOut,
  onInputChange,
  RESET_FORM,
} from "../../utils/formUtil";
import { SUCCESS } from "../../utils/crud";
import { FormError, SnackBar } from "../../components/common";
import useAlert from "../../utils/hooks/useAlert";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../Store/actions";
import { LibButton } from "../../components/common/LibButton";
import { RootState } from "../../Store/store";

const useStyles = makeStyles({
  form: {
    width: "40rem",
  },
});

const initialState = {
  isbn: { value: "", touched: false, hasError: true, error: "" },
  isFormValid: false,
};
const IsbnSearchEntryView = () => {
  const [formState, dispatchForm] = useReducer(formsReducer, initialState);
  const dispatch = useDispatch();
  const notification = useSelector(
    (state: RootState) => state.notifications.notification
  );
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

  const formSubmitHandler = async (event: FormEvent) => {
    setIsCreating(true);
    event.preventDefault();
    if (!isValidForm(formState, dispatchForm)) {
      setShowError(true);
      setError("Please address all the highlighted errors.");
      setIsCreating(false);
    } else {
      dispatch(createBook({ isbn: formState.isbn.value }));
    }
  };

  const handleErrorAlertClose = () => {
    setShowError(false);
    setError("");
  };

  return (
    <Grid>
      <SnackBar
        message={error}
        open={showError}
        severity={"error"}
        onClose={handleErrorAlertClose}
      />
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <form
          className={`${classes.form}`}
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
          <LibButton
            variant="contained"
            color="primary"
            disabled={isCreating}
            aria-disabled={isCreating}
            disableElevation
            type="submit"
            value="Add"
          >
            Add
          </LibButton>
        </form>
      </Grid>
    </Grid>
  );
};

export default IsbnSearchEntryView;
