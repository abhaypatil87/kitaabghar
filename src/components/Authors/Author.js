import React, { useEffect, useReducer, useState } from "react";
import {
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

import {
  formsReducer,
  isValidForm,
  onFocusOut,
  onInputChange,
  RESET_FORM,
} from "../../utils/formUtil";
import { updateAuthor } from "../../utils/crud";
import { LibAlert, FormError } from "../common";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "baseline",
  },
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

const getInitialState = (props) => {
  return {
    first_name: {
      value: props.first_name,
      touched: false,
      hasError: true,
      error: "",
    },
    last_name: {
      value: props.last_name,
      touched: false,
      hasError: true,
      error: "",
    },
    isFormValid: false,
  };
};

const Author = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("Please enter all the required fields");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [authorState, setAuthorState] = useState({});
  const [fullName, setFullName] = useState(
    `${props.first_name} ${props.last_name}`
  );
  const [formState, dispatch] = useReducer(
    formsReducer,
    getInitialState(props)
  );
  const classes = useStyles();

  useEffect(() => {
    setAuthorState({ ...props });
  }, []);

  const resetForm = () => {
    dispatch({
      type: RESET_FORM,
      data: getInitialState(props),
    });
  };
  const enableEdit = () => {
    setEditMode(true);
  };
  const cancelEdit = () => {
    setEditMode(false);
    resetForm();
  };

  const editClickHandler = async (event) => {
    event.preventDefault();
    if (!isValidForm(formState, dispatch)) {
      setShowError(true);
      setError("Please address all the highlighted errors.");
    } else {
      await handleEditAuthor({
        author_id: authorState.author_id,
        first_name: formState.first_name.value,
        last_name: formState.last_name.value,
      });
    }
  };

  const handleEditAuthor = async (authorDataObject) => {
    try {
      setIsEditing(true);
      let response = await updateAuthor(authorDataObject);
      response = await response;
      if (response.status === 200) {
        const result = await response.json();
        if (result.data !== undefined) {
          setShowSuccess(true);
          setSuccess(`The author name has been updated successfully.`);
          setFullName(
            `${authorDataObject.first_name} ${authorDataObject.last_name}`
          );
        }
      } else {
        const responseText = await response.text();
        setShowError(true);
        setError(responseText);
        resetForm();
      }
    } catch (error) {
      setShowError(true);
      setError(error.message);
      resetForm();
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
    <Box component="div" marginTop={2}>
      <Grid item xs={12} sm container className={classes.container}>
        {showError && (!formState.isFormValid || error.length > 0) && (
          <LibAlert
            severity="error"
            onClose={handleErrorAlertClose}
            message={error}
          />
        )}

        {showSuccess && (
          <LibAlert
            severity="success"
            onClose={handleSuccessAlertClose}
            message={success}
          />
        )}
        {!editMode && (
          <Typography variant="body1" tabIndex={0} aria-label={fullName}>
            {fullName}
          </Typography>
        )}
        <Fade in={editMode} timeout={1} unmountOnExit>
          <>
            <TextField
              autoFocus={true}
              margin="dense"
              variant="outlined"
              type="text"
              title="First Name"
              name="firstname"
              id="firstname"
              value={formState.first_name.value}
              onChange={(event) => {
                onInputChange(
                  "first_name",
                  event.target.value,
                  dispatch,
                  formState
                );
              }}
              onBlur={(event) => {
                onFocusOut(
                  "first_name",
                  event.target.value,
                  dispatch,
                  formState
                );
              }}
            />
            {formState.first_name.touched && formState.first_name.hasError && (
              <FormError error={formState.first_name.error} />
            )}
            <TextField
              margin="dense"
              variant="outlined"
              type="text"
              title="Last Name"
              name="lastname"
              id="lastname"
              value={formState.last_name.value}
              onChange={(event) => {
                onInputChange(
                  "last_name",
                  event.target.value,
                  dispatch,
                  formState
                );
              }}
              onBlur={(event) => {
                onFocusOut(
                  "last_name",
                  event.target.value,
                  dispatch,
                  formState
                );
              }}
            />
            {formState.last_name.touched && formState.last_name.hasError && (
              <FormError error={formState.last_name.error} />
            )}
          </>
        </Fade>
        <Grid component="span" hidden={editMode}>
          <IconButton
            size="medium"
            onClick={enableEdit}
            className={`${classes.iconButton} ${classes.hover}`}
            aria-label={"Edit"}
          >
            <EditRoundedIcon fontSize="small" />
          </IconButton>
        </Grid>
        <Grid component="div" hidden={!editMode}>
          <Button
            style={{ marginLeft: "6px" }}
            variant="contained"
            color="primary"
            disableElevation
            type="button"
            value="Edit"
            size="small"
            onClick={editClickHandler}
          >
            Save
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
    </Box>
  );
};

export default Author;
