import { Stack, Divider, Typography } from "@material-ui/core";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { LoadingButton } from "@material-ui/lab";

interface SocialLoginViewProps {
  isLoading: boolean;
  responseGoogle: (
    response: GoogleLoginResponseOffline | GoogleLoginResponse
  ) => void;
}
const SocialLoginView = (props: SocialLoginViewProps) => {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <GoogleLogin
          clientId="843370297041-p3ctojq44sgj8unodgofdf9b42d4jf7j.apps.googleusercontent.com"
          render={(renderProps) => (
            <LoadingButton
              fullWidth
              loading={props.isLoading}
              loadingIndicator="Signing In With Google"
              variant="contained"
              color="primary"
              style={{ textTransform: "none" }}
              onClick={renderProps.onClick}
              aria-disabled={props.isLoading}
            >
              Continue with Google
            </LoadingButton>
          )}
          buttonText="Login"
          onSuccess={props.responseGoogle}
          onFailure={props.responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Or
        </Typography>
      </Divider>
    </>
  );
};

export default SocialLoginView;
