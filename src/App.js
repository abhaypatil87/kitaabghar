import React, { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { Column, Row } from "simple-flexbox";
import Sidebar from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header";
import styles from "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthorsView from "./Views/AuthorsView";
import BooksView from "./Views/BooksView";
import TimelineView from "./Views/TimelineView";
import AddBooksView from "./Views/AddBooksView";
import { SnackBar } from "./components/common";
import { useSelector } from "react-redux";
import useAlert from "./utils/hooks/useAlert";

const routes = [
  {
    path: "/authors",
    Component: AuthorsView,
  },
  {
    path: "/books",
    Component: BooksView,
  },
  { path: "/timeline", Component: TimelineView },
  {
    path: "/add-books",
    Component: AddBooksView,
  },
];

const App = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [selectedItem, setSelectedItem] = useState("books");
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
    <Router>
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
          <div className={styles.content}>
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path} children={<Component />} />
            ))}
          </div>
        </Column>
      </Row>
    </Router>
  );
};

export default App;
