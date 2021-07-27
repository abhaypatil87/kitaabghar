import { useEffect, useLayoutEffect, useReducer } from "react";
import { SnackBar } from "./components/common";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import useAlert from "./utils/hooks/useAlert";
import Router from "./routes";
import { LOCAL_STORAGE_USER_KEY } from "./utils/crud";
import { signOut } from "./Store/actions";

const App = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const notification = useSelector((state) => state.notifications.notification);
  const { showNotification, setShowNotification } = useAlert();
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));
  const dispatch = useDispatch();
  const history = useNavigate();

  useLayoutEffect(() => {
    window.addEventListener("resize", forceUpdate);
    return () => window.removeEventListener("resize", forceUpdate);
  }, []);

  useEffect(() => {
    if (user && user?.token) {
      const decodedToken = decode(user?.token);
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

  const handleAlertClose = (event, reason) => {
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
          onClose={handleAlertClose}
        />
      )}
      <Router user={user} />
    </>
  );
};

export default App;
