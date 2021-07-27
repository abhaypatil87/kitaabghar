import React, { useReducer, useState } from "react";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import useAlert from "../utils/hooks/useAlert";
import { FormError, SnackBar } from "../components/common";
import {
  formsReducer,
  isValidForm,
  onFocusOut,
  onInputChange,
} from "../utils/formUtil";
import { signUp } from "../Store/actions";

const initialState = {
  first_name: { value: "", touched: false, hasError: true, error: "" },
  last_name: { value: "", touched: false, hasError: true, error: "" },
  email: { value: "", touched: false, hasError: true, error: "" },
  password: { value: "", touched: false, hasError: true, error: "" },
  isFormValid: false,
};
const SignUpFormView = () => {
  const dispatch = useDispatch();
  const { showError, setShowError } = useAlert();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formState, dispatchForm] = useReducer(formsReducer, initialState);
  const [error, setError] = useState("Please enter all the required fields");

  const formSubmitHandler = async (event) => {
    setIsSigningUp(true);
    event.preventDefault();
    if (!isValidForm(formState, dispatchForm)) {
      setShowError(true);
      setError("Please address all the highlighted errors.");
      setIsSigningUp(false);
    } else {
      dispatch(
        signUp({
          first_name: formState.first_name.value,
          last_name: formState.last_name.value,
          email: formState.email.value,
          password: formState.password.value,
          external_id: null,
        })
      );
      setIsSigningUp(false);
    }
  };

  const handleErrorAlertClose = () => {
    setShowError(false);
    setError("");
  };

  return (
    <>
      <SnackBar
        message={error}
        open={showError}
        severity={"error"}
        onClose={handleErrorAlertClose}
      />
      <form noValidate onSubmit={(event) => formSubmitHandler(event)}>
        <Stack spacing={3}>
          <Stack>
            <TextField
              fullWidth
              label="First name"
              name="first_name"
              id="first_name"
              type="text"
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
            {formState.first_name.touched && formState.first_name.hasError && (
              <FormError error={formState.first_name.error} />
            )}
          </Stack>
          <Stack>
            <TextField
              fullWidth
              label="Last name"
              name="last_name"
              id="last_name"
              type="text"
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
            {formState.last_name.touched && formState.last_name.hasError && (
              <FormError error={formState.last_name.error} />
            )}
          </Stack>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            name="email"
            id="email"
            value={formState.email.value}
            onChange={(event) => {
              onInputChange(
                "email",
                event.target.value,
                dispatchForm,
                formState
              );
            }}
            onBlur={(event) => {
              onFocusOut("email", event.target.value, dispatchForm, formState);
            }}
          />
          {formState.email.touched && formState.email.hasError && (
            <FormError error={formState.email.error} />
          )}

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            name="password"
            id="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(event) => {
              onInputChange(
                "password",
                event.target.value,
                dispatchForm,
                formState
              );
            }}
            onBlur={(event) => {
              onFocusOut(
                "password",
                event.target.value,
                dispatchForm,
                formState
              );
            }}
          />
          {formState.password.touched && formState.password.hasError && (
            <FormError error={formState.password.error} />
          )}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            style={{ textTransform: "none" }}
            disabled={isSigningUp}
            aria-disabled={isSigningUp}
          >
            Register
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
};

export default SignUpFormView;
