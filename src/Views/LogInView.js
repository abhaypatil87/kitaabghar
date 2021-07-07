import { Box, Container, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";

const LogInView = () => {
  const currentLocation = useLocation();

  const renderHeader = () => {
    return (
      <div>
        {currentLocation.pathname === "/sign-in" && (
          <Typography variant="h1">Sign In to Home Library</Typography>
        )}
        {currentLocation.pathname === "/sign-up" && (
          <Typography variant="h1">Sign up for Home Library</Typography>
        )}
      </div>
    );
  };

  return (
    <>
      <Container maxWidth="md">
        <Box>{renderHeader()}</Box>
        <Box>
          <div id="choices">
            <div className="third_party_sign_in">
              <a
                href="#"
                data-redirect="/user/new"
                className="fbjsLogin "
                id="fb-auth-button"
              >
                <button className="gr-button--facebook gr-button--dark gr-button--auth gr-button  facebookConnectButton fbSignInButton">
                  <span className="gr-button--facebook__icon" />
                  Continue with Facebook
                </button>
              </a>
              <button className="gr-button gr-button--amazon gr-button--auth amazonConnectButton amazonSignInButton">
                <span className="gr-button--amazon__icon" />
                Continue with Amazon
              </button>
              <button className="gr-button gr-button--apple gr-button--auth appleConnectButton thirdPartySignInButton">
                <span className="gr-button--apple__icon" />
                Continue with Apple
              </button>
              <div className="deprecated">
                <a className="google_account" href="/">
                  Sign in with Google
                </a>
              </div>
            </div>
            <p className="gradient">
              <span>or</span>
            </p>
          </div>
        </Box>
        <Box>
          <div id="emailForm">
            <form
              name="sign_in"
              action="https://www.goodreads.com/user/sign_in"
              acceptCharset="UTF-8"
              method="post"
            >
              <input name="utf8" type="hidden" value="✓" />
              <input
                type="hidden"
                name="authenticity_token"
                value="Fy+0wynXVsIlUg/6MZJmdU0iIsrlYftXvlQZuYDSMziBKIm5UdWokDoUnGOD+yzBI4yY+XgLH3esjbFDlgWwaw=="
              />
              <fieldset>
                <div className="fieldPara clearFix">
                  <label htmlFor="user_email">Email address</label>
                  <input
                    spellCheck="false"
                    placeholder="you@yours.com"
                    autoFocus="autofocus"
                    type="email"
                    name="user[email]"
                    id="user_email"
                  />
                </div>
                <div className="fieldPara clearFix">
                  <label htmlFor="user_password">Password</label>
                  <input
                    maxLength="128"
                    size="128"
                    type="password"
                    name="user[password]"
                    id="user_password"
                  />
                </div>
                <div className="fieldPara">
                  <input
                    checked="checked"
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                  />
                  <label htmlFor="remember_me">Keep me signed in</label>
                </div>
                <div className="captcha">
                  <br />
                </div>
                <div className="submitPara">
                  <input
                    className="gr-button gr-button--large"
                    name="next"
                    type="submit"
                    value="Sign in"
                  />
                  <a className="actionLink forgot" href="">
                    Forgot password
                  </a>
                  <div className="signUpOption">
                    <span>
                      Not a member?
                      <a href="/sign-up">Sign up</a>
                    </span>
                  </div>
                </div>
                <input name="n" type="hidden" value="531562" />
              </fieldset>
            </form>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default LogInView;
