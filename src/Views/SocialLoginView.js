import { Stack, Divider, Typography } from "@material-ui/core";
import GoogleLogin from "react-google-login";
import { LoadingButton } from "@material-ui/lab";

const SocialLoginView = (props) => {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <GoogleLogin
          clientId="843370297041-p3ctojq44sgj8unodgofdf9b42d4jf7j.apps.googleusercontent.com"
          render={(renderProps) => (
            <LoadingButton
              fullWidth
              variant={"outlined"}
              color="primary"
              style={{ textTransform: "none" }}
              onClick={renderProps.onClick}
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
          OR
        </Typography>
      </Divider>
    </>
  );
};

export default SocialLoginView;
