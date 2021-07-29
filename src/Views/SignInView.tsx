import { Link as RouterLink, useLocation } from "react-router-dom";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Stack, Link, Container, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import { signIn } from "../Store/actions";
import SignUpFormView from "./SignUpFormView";
import SignInFormView from "./SignInFormView";
import SocialLoginView from "./SocialLoginView";
import { ExternalIdentifiers } from "../declarations";
import { RootState } from "../Store/store";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 400,
  margin: "auto",
  display: "flex",
  minHeight: "100%",
  flexDirection: "column",
  justifyContent: "center",
  marginTop: theme.spacing(12),
}));

const SignInView = () => {
  const dispatch = useDispatch();
  const currentLocation = useLocation();
  const [loading, setLoading] = useState(false);
  const notification = useSelector(
    (state: RootState) => state.notifications.notification
  );

  useEffect(() => {
    if (notification !== null) {
      if (notification.lastOp === "SIGN_IN") {
        setLoading(false);
      }
    }
  }, [notification]);

  const googleSuccessCallbackHandler = async (
    response: GoogleLoginResponseOffline | GoogleLoginResponse
  ) => {
    if ("profileObj" in response && "tokenId" in response) {
      const signInData = {
        image_url: response.profileObj.imageUrl,
        email: response.profileObj.email,
        first_name: response.profileObj.givenName,
        last_name: response.profileObj.familyName,
        external: ExternalIdentifiers.GOOGLE,
        token: response.tokenId,
      };

      try {
        setLoading(true);
        dispatch(signIn(signInData));
      } catch (error) {
        console.log(`${error}`);
      }
    }
  };

  const renderSignUpOptions = () => {
    return (
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Already have an account?&nbsp;
        <Link variant="subtitle2" component={RouterLink} to="/sign-in">
          Sign In
        </Link>
      </Typography>
    );
  };

  const renderSignInOptions = () => {
    return (
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Don’t have an account?&nbsp;
        <Link variant="subtitle2" component={RouterLink} to="/sign-up">
          Get started
        </Link>
      </Typography>
    );
  };

  const renderLoginOptions = () => {
    return (
      <>
        {currentLocation.pathname === "/sign-up" && renderSignUpOptions()}
        {currentLocation.pathname === "/sign-in" && renderSignInOptions()}
      </>
    );
  };
  return (
    <>
      <Container maxWidth="xs">
        <ContentStyle>
          <Stack sx={{ mb: 5, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              Sign in to Home Library
            </Typography>
          </Stack>

          <SocialLoginView
            isLoading={loading}
            responseGoogle={googleSuccessCallbackHandler}
          />
          {currentLocation.pathname === "/sign-in" && <SignInFormView />}
          {currentLocation.pathname === "/sign-up" && <SignUpFormView />}

          {renderLoginOptions()}
        </ContentStyle>
      </Container>
    </>
  );
};

export default SignInView;
