import { Navigate, useRoutes } from "react-router-dom";

import BooksView from "./Views/BooksView";
import AuthorsView from "./Views/AuthorsView";
import TimelineView from "./Views/TimelineView";
import AddBooksView from "./Views/AddBooksView";
import SettingsView from "./Views/SettingsView";
import LibraryLayout from "./Views/layouts/LibraryLayout";
import LoginLayout from "./Views/layouts/LoginLayout";
import LogInView from "./Views/LogInView";

const Router = () => {
  return useRoutes([
    {
      path: "/library",
      element: <LibraryLayout />,
      children: [
        { path: "/", element: <Navigate to="/library/books" replace /> },
        { path: "books", element: <BooksView /> },
        { path: "authors", element: <AuthorsView /> },
        { path: "add-books", element: <AddBooksView /> },
        { path: "settings", element: <SettingsView /> },
        { path: "timeline", element: <TimelineView /> },
      ],
    },
    {
      path: "/",
      element: <LoginLayout />,
      children: [
        { path: "/sign-in", element: <LogInView /> },
        { path: "/sign-up", element: <LogInView /> },
        { path: "/", element: <Navigate to="/library" /> },
      ],
    },
  ]);
};

export default Router;
