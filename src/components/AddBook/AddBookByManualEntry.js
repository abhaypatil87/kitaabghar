import React, { useEffect, useReducer, useState } from "react";
import { Box, Button, Grid, TextField, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import {
  initialState,
  formsReducer,
  isValidForm,
  onFocusOut,
  onInputChange,
  ALLOWED_DESCRIPTION_LENGTH,
  RESET_FORM,
} from "../../utils/formUtil";
import { SUCCESS } from "../../utils/crud";
import { LibAlert, FormError, WordCounter } from "../common";
import useAlert from "../../utils/hooks/useAlert";
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

const AddBookByManualEntry = () => {
  const classes = useStyles();
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [formState, dispatchForm] = useReducer(formsReducer, initialState);
  const [isCreating, setIsCreating] = useState(false);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notifications.notification);

  const { error, setError, showError, setShowError } = useAlert();

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
      dispatch(
        createBook({
          title: formState.title.value,
          description: formState.description.value,
          subtitle: formState.subtitle.value,
          isbn_10: formState.isbn_10.value,
          isbn_13: formState.isbn_13.value,
          page_count: formState.page_count.value,
          thumbnail_url: formState.thumbnail_url.value,
          author: formState.author.value,
        })
      );
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
      <Grid item xs={12} sm={12} md={8} lg={6}>
        {showError && (!formState.isFormValid || error.length > 0) && (
          <LibAlert
            severity="error"
            className={classes.m2}
            onClose={handleErrorAlertClose}
            message={error}
          />
        )}
        <form
          className={`${classes.m1} ${classes.form}`}
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
                  dispatchForm,
                  formState
                );
              }}
              onBlur={(event) => {
                onFocusOut(
                  "subtitle",
                  event.target.value,
                  dispatchForm,
                  formState
                );
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
                  dispatchForm,
                  formState
                );
              }}
              onBlur={(event) => {
                onFocusOut(
                  "author",
                  event.target.value,
                  dispatchForm,
                  formState
                );
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
              rows={4}
              rowsMax={4}
              helperText={`Maximum ${ALLOWED_DESCRIPTION_LENGTH} characters allowed`}
              variant="outlined"
              fullWidth
              type="text"
              name="description"
              id="description"
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
                  dispatchForm,
                  formState
                );
              }}
              onBlur={(event) => {
                onFocusOut(
                  "isbn_10",
                  event.target.value,
                  dispatchForm,
                  formState
                );
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
                  dispatchForm,
                  formState
                );
              }}
              onBlur={(event) => {
                onFocusOut(
                  "isbn_13",
                  event.target.value,
                  dispatchForm,
                  formState
                );
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
                  dispatchForm,
                  formState
                );
              }}
              onBlur={(event) => {
                onFocusOut(
                  "page_count",
                  event.target.value,
                  dispatchForm,
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
                  dispatchForm,
                  formState
                );
              }}
              onBlur={(event) => {
                onFocusOut(
                  "thumbnail_url",
                  event.target.value,
                  dispatchForm,
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
