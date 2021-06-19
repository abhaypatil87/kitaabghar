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
import { FormError, SnackBar } from "../common";
import useAlert from "../../utils/hooks/useAlert";
import { useDispatch } from "react-redux";
import { editAuthor } from "../../Store/actions/authors-actions";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "baseline",
  },
  hover: {
    cursor: "pointer",
  },
  iconButton: {
    "&:hover": {
      color: "#2158d0",
    },
  },
  nameBox: {
    alignItems: "center",
    display: "inherit",
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
  const [authorState, setAuthorState] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(
    `${props.first_name} ${props.last_name}`
  );
  const [formState, dispatchForm] = useReducer(
    formsReducer,
    getInitialState(props)
  );
  const dispatch = useDispatch();
  const {
    success,
    setSuccess,
    error,
    setError,
    showError,
    setShowError,
    showSuccess,
    setShowSuccess,
  } = useAlert();
  const classes = useStyles();

  useEffect(() => {
    setAuthorState({ ...props });
  }, []);

  const resetForm = () => {
    dispatchForm({
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
    if (!isValidForm(formState, dispatchForm)) {
      setShowError(true);
      setError("Please address all the highlighted errors.");
    } else {
      dispatch(
        editAuthor({
          author_id: authorState.author_id,
          first_name: formState.first_name.value,
          last_name: formState.last_name.value,
        })
      );
    }
  };

  const handleErrorAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowError(false);
    setError("");
  };

  const handleSuccessAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccess(false);
    setSuccess("");
  };

  return (
    <Box marginTop={2}>
      <SnackBar
        message={error}
        open={showError}
        severity={"error"}
        onClose={handleErrorAlertClose}
      />
      <SnackBar
        message={success}
        open={showSuccess}
        severity={"success"}
        onClose={handleSuccessAlertClose}
      />
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        container
        className={classes.container}
      >
        <Grid container spacing={1}>
          {!editMode && (
            <Box hidden={editMode} className={classes.nameBox}>
              <Typography variant="body1" tabIndex={0}>
                {fullName}
              </Typography>
              <IconButton
                size="medium"
                onClick={enableEdit}
                className={`${classes.iconButton} ${classes.hover}`}
                aria-label={"Edit"}
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Grid>
        <Fade in={editMode} timeout={1} unmountOnExit>
          <>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  autoFocus={true}
                  margin="dense"
                  variant="standard"
                  type="text"
                  data-testid="firstname"
                  title="First Name"
                  name="firstname"
                  value={formState.first_name.value}
                  onChange={(event) => {
                    onInputChange(
                      "first_name",
                      event.target.value,
                      dispatchForm,
                      formState
                    );
                  }}
                  onBlur={(event) => {
                    onFocusOut(
                      "first_name",
                      event.target.value,
                      dispatchForm,
                      formState
                    );
                  }}
                />
                {formState.first_name.touched &&
                  formState.first_name.hasError && (
                    <FormError error={formState.first_name.error} />
                  )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  margin="normal"
                  variant="standard"
                  type="text"
                  title="Last Name"
                  name="lastname"
                  value={formState.last_name.value}
                  onChange={(event) => {
                    onInputChange(
                      "last_name",
                      event.target.value,
                      dispatchForm,
                      formState
                    );
                  }}
                  onBlur={(event) => {
                    onFocusOut(
                      "last_name",
                      event.target.value,
                      dispatchForm,
                      formState
                    );
                  }}
                />
                {formState.last_name.touched &&
                  formState.last_name.hasError && (
                    <FormError error={formState.last_name.error} />
                  )}
              </Grid>
            </Grid>
          </>
        </Fade>
        <Grid item xs={12} sm={12} md={12} lg={12} hidden={!editMode}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disabled={isEditing}
            aria-disabled={isEditing}
            type="button"
            value="Edit"
            size="small"
            onClick={editClickHandler}
          >
            Edit
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
