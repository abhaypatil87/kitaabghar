import React, { useEffect, useLayoutEffect, useReducer } from "react";
import { SnackBar } from "./components/common";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import Router from "./routes";
import { signOut } from "./Store/actions";
import { loggedInUser, RootState } from "./Store/store";
import useAlert from "./utils/hooks/useAlert";
import { DecodedToken } from "./declarations";

const App = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const notification = useSelector(
    (state: RootState) => state.notifications.notification
  );
  const { showNotification, setShowNotification } = useAlert();
  const user = loggedInUser.getLoggedInUser();
  const dispatch = useDispatch();
  const history = useNavigate();

  useLayoutEffect(() => {
    window.addEventListener("resize", forceUpdate);
    return () => window.removeEventListener("resize", forceUpdate);
  }, []);

  useEffect(() => {
    if (user && user?.token) {
      const decodedToken: DecodedToken = jwtDecode(user?.token);
      const currentTimeInMill = new Date().getTime();
      const mill = decodedToken.exp * 1000;
      if (mill < currentTimeInMill) {
        dispatch(signOut());
        history("/sign-in");
      }
    }
  }, [dispatch, history, user]);

  useEffect(() => {
    if (notification && notification.message !== null) {
      setShowNotification(true);
    }
  }, [notification, setShowNotification]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setShowNotification(false);
  };

  return (
    <>
      {notification && notification.message && (
        <SnackBar
          message={notification.message}
          open={showNotification}
          severity={notification.status}
          onClose={handleClose}
        />
      )}
      <Router user={user} />
    </>
  );
};

export default App;
