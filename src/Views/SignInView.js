import { Link as RouterLink, useLocation } from "react-router-dom";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Stack, Link, Container, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import SocialLoginView from "./SocialLoginView";
import SignInFormView from "./SignInFormView";
import { signIn } from "../Store/actions";
import SignUpFormView from "./SignUpFormView";

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

  const googleSuccessCallbackHandler = async (response) => {
    const profile = response?.profileObj;
    const token = response?.tokenId;

    const signInData = {
      image_url: profile.imageUrl,
      email: profile.email,
      first_name: profile.givenName,
      last_name: profile.familyName,
      external: "GOOGLE",
      token: token,
    };
    try {
      dispatch(signIn(signInData));
    } catch (error) {
      console.log(`${error}`);
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

          <SocialLoginView responseGoogle={googleSuccessCallbackHandler} />
          {currentLocation.pathname === "/sign-in" && <SignInFormView />}
          {currentLocation.pathname === "/sign-up" && <SignUpFormView />}

          {renderLoginOptions()}
        </ContentStyle>
      </Container>
    </>
  );
};

export default SignInView;
