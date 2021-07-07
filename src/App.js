import React, { useEffect, useLayoutEffect, useReducer } from "react";
import { SnackBar } from "./components/common";
import { useSelector } from "react-redux";
import useAlert from "./utils/hooks/useAlert";
import Router from "./routes";

const App = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const notification = useSelector((state) => state.notifications.notification);
  const { showNotification, setShowNotification } = useAlert();

  useLayoutEffect(() => {
    window.addEventListener("resize", forceUpdate);

    return () => window.removeEventListener("resize", forceUpdate);
  }, []);

  useEffect(() => {
    if (notification && notification.message !== null) {
      setShowNotification(true);
    }
  }, [notification, setShowNotification]);

  const handleErrorAlertClose = (event, reason) => {
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
          onClose={handleErrorAlertClose}
        />
      )}
      <Router />
    </>
  );
};

export default App;
