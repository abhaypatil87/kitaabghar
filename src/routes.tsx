import { Navigate, useRoutes } from "react-router-dom";

import BooksView from "./Views/BooksView";
import AuthorsView from "./Views/AuthorsView";
import TimelineView from "./Views/TimelineView";
import AddBooksView from "./Views/AddBooks/AddBooksView";
import SettingsView from "./Views/Settings/SettingsView";
import LibraryLayout from "./Views/layouts/LibraryLayout";
import LoginLayout from "./Views/layouts/LoginLayout";
import SignInView from "./Views/SignInView";
import { User } from "./declarations";

const Router = (props: { user: User | null }) => {
  const isLoggedIn = props.user !== null;
  return useRoutes([
    {
      path: "/library",
      element: !isLoggedIn ? <Navigate to="/sign-in" /> : <LibraryLayout />,
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
      element: !isLoggedIn ? <LoginLayout /> : <Navigate to="/library" />,
      children: [
        { path: "/", element: <Navigate to="/sign-in" replace /> },
        { path: "/sign-in", element: <SignInView /> },
        { path: "/sign-up", element: <SignInView /> },
      ],
    },
  ]);
};

export default Router;
