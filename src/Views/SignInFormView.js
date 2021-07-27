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
import {
  formsReducer,
  isValidForm,
  onFocusOut,
  onInputChange,
} from "../utils/formUtil";
import { signIn } from "../Store/actions";
import useAlert from "../utils/hooks/useAlert";
import { useDispatch } from "react-redux";
import { FormError, SnackBar } from "../components/common";

const initialState = {
  email: { value: "", touched: false, hasError: true, error: "" },
  password: { value: "", touched: false, hasError: true, error: "" },
  isFormValid: false,
};

const SignInFormView = () => {
  const dispatch = useDispatch();
  const { showError, setShowError } = useAlert();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formState, dispatchForm] = useReducer(formsReducer, initialState);
  const [error, setError] = useState(
    "Please enter the email ID or password to sign in"
  );

  const formSubmitHandler = async (event) => {
    setIsSigningIn(true);
    event.preventDefault();
    if (!isValidForm(formState, dispatchForm)) {
      setShowError(true);
      setError("Please address all the highlighted errors.");
      setIsSigningIn(false);
    } else {
      dispatch(
        signIn({
          email: formState.email.value,
          password: formState.password.value,
        })
      );
      setIsSigningIn(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
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
        <Stack spacing={2}>
          <TextField
            size={"medium"}
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
            size={"medium"}
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            name="password"
            id="password"
            value={formState.password.value}
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {formState.password.touched && formState.password.hasError && (
            <FormError error={formState.password.error} />
          )}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            style={{ textTransform: "none" }}
            loading={isSigningIn}
            aria-disabled={isSigningIn}
          >
            Login
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
};

export default SignInFormView;
