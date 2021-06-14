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
} from "../../utils/formUtil";
import FormError from "../common/FormError/FormError";
import { updateAuthor } from "../../utils/crud";
import ErrorAlert from "../common/Alert/ErrorAlert";
import SuccessAlert from "../common/Alert/SuccessAlert";

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
  const [formState, dispatch] = useReducer(
    formsReducer,
    getInitialState(props)
  );

  useEffect(() => {
    setAuthorState({ ...props });
  }, []);

  const enableEdit = () => {
    setEditMode(true);
  };
  const cancelEdit = () => {
    setEditMode(false);
  };
  const classes = useStyles();

  let fullName = `${props.first_name} ${props.last_name}`;

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
        setShowSuccess(true);
        setSuccess(`The author record has been updated successfully.`);
      } else {
        const responseText = await response.text();
        setShowError(true);
        setError(responseText);
      }
    } catch (error) {
      setShowError(true);
      setError(error.message);
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
        {!editMode && (
          <Typography variant="subtitle1" tabIndex={0} aria-label={fullName}>
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
