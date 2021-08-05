import React, { FormEvent, useEffect, useReducer, useState } from "react";
import Quagga from "@ericblade/quagga2";
import { Grid, IconButton, Paper, Divider, InputBase } from "@material-ui/core";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import {
  formsReducer,
  isValidForm,
  onFocusOut,
  onInputChange,
  RESET_FORM,
} from "../../utils/formUtil";
import { Status } from "../../utils/crud";
import { FormError, SnackBar } from "../../components/common";
import useAlert from "../../utils/hooks/useAlert";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../Store/actions";
import { LibButton } from "../../components/common/LibButton";
import { RootState } from "../../Store/store";

const initialState = {
  isbn: { value: "", touched: false, hasError: true, error: "" },
  isFormValid: false,
};

const IsbnSearchEntryView: React.FC = () => {
  const [formState, dispatchForm] = useReducer(formsReducer, initialState);
  const dispatch = useDispatch();
  const notification = useSelector(
    (state: RootState) => state.notifications.notification
  );
  const [error, setError] = useState(
    "Please enter a 10 or 13 digit ISBN value"
  );
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const { showError, setShowError } = useAlert();

  useEffect(() => {
    setIsCreating(false);
    if (notification !== null) {
      if (notification.lastOp === "ADD_BOOK") {
        if (notification.status === Status.SUCCESS) {
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

  const handleCapture = (target: any) => {
    if (target.files) {
      if (target.files.length !== 0) {
        setIsCreating(true);
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        Quagga.decodeSingle(
          {
            src: newUrl,
            numOfWorkers: 0,
            inputStream: {
              size: 4000,
            },
            decoder: {
              readers: ["ean_reader"],
            },
          },
          function (result: any) {
            setIsCreating(false);
            if (result.codeResult) {
              dispatch(createBook({ isbn: result.codeResult.code }));
            } else {
              setShowError(true);
              setError("Error occurred while scanning the Barcode.");
            }
          }
        );
      }
    }
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
        <form onSubmit={(event) => formSubmitHandler(event)}>
          <Paper
            variant={"outlined"}
            component="div"
            sx={{
              my: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              name="isbn"
              id="isbn"
              fullWidth
              sx={{ ml: 1, my: 1, flex: 1 }}
              placeholder="ISBN Number"
              inputProps={{ "aria-label": "ISBN Number" }}
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
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              capture="environment"
              onChange={(e) => handleCapture(e.target)}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="upload picture"
                component="span"
              >
                <PhotoCameraRoundedIcon fontSize={"medium"} />
              </IconButton>
            </label>
          </Paper>
          {formState.isbn.touched && formState.isbn.hasError && (
            <FormError error={formState.isbn.error} />
          )}
          <LibButton
            variant="contained"
            color="primary"
            disabled={isCreating}
            aria-disabled={isCreating}
            disableElevation
            type="submit"
            value="Add"
          >
            {isCreating ? "Adding" : "Add"}
          </LibButton>
        </form>
      </Grid>
    </Grid>
  );
};

export default IsbnSearchEntryView;
