import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import {
  Box,
  Fade,
  Grid,
  IconButton,
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
import { editAuthor } from "../../Store/actions";
import { LibButton } from "../common/LibButton";
import { RootState } from "../../Store/store";
import { AuthorType } from "../../declarations";

const useStyles = makeStyles({
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
});

type AuthorPropsType = AuthorType;

const getInitialState = (props: AuthorPropsType) => {
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

const Author = (props: AuthorPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, dispatchForm] = useReducer(
    formsReducer,
    getInitialState(props)
  );
  const dispatch = useDispatch();
  const notification = useSelector(
    (state: RootState) => state.notifications.notification
  );
  const { error, setError, showError, setShowError } = useAlert();
  const classes = useStyles();
  const reset = useCallback(() => {
    dispatchForm({
      type: RESET_FORM,
      data: getInitialState(props),
    });
  }, [props]);
  useEffect(() => {
    setEditMode(false);
    setIsEditing(false);
  }, [notification]);

  const editClickHandler = async () => {
    if (!isValidForm(formState, dispatchForm)) {
      setShowError(true);
      setError("Please address all the highlighted errors.");
    } else {
      setIsEditing(true);
      dispatch(
        editAuthor({
          author_id: props.author_id,
          first_name: formState.first_name.value,
          last_name: formState.last_name.value,
        })
      );
    }
  };

  /*
   * Utility methods
   */
  const enableEdit = () => setEditMode(true);
  const cancelEdit = () => {
    setEditMode(false);
    reset();
  };

  const handleErrorAlertClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowError(false);
    setError("");
  };

  return (
    <Box marginTop={2}>
      <SnackBar
        message={error}
        open={showError}
        severity={"error"}
        onClose={handleErrorAlertClose}
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
        <Grid container>
          {!editMode && (
            <Box className={classes.nameBox}>
              <Typography variant="body1">
                {props.first_name} {props.last_name}
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
          <Box>
            <Grid container>
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
          </Box>
        </Fade>
        <Grid item xs={12} sm={12} md={12} lg={12} hidden={!editMode}>
          <LibButton
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
          </LibButton>
          <LibButton
            style={{ marginLeft: "6px" }}
            size="small"
            onClick={cancelEdit}
            variant={"outlined"}
          >
            Cancel
          </LibButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Author;
