import React, { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { Column, Row } from "simple-flexbox";
import { SnackBar } from "./components/common";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";

import routes from "./routes";
import styles from "./App.css";
import useAlert from "./utils/hooks/useAlert";
import { Header } from "./components/Header";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  const routing = useRoutes(routes);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [selectedItem, setSelectedItem] = useState("Books");
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
      <Row className={styles.container}>
        <Sidebar
          selectedItem={selectedItem}
          onChange={(selectedItem) => setSelectedItem(selectedItem)}
        />
        <Column flexGrow={1} className={styles.mainBlock}>
          <Header title={selectedItem} />
          <div className={styles.content}>{routing}</div>
        </Column>
      </Row>
    </>
  );
};

export default App;
