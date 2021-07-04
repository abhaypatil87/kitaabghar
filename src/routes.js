import { Navigate } from "react-router-dom";

import BooksView from "./Views/BooksView";
import AuthorsView from "./Views/AuthorsView";
import TimelineView from "./Views/TimelineView";
import AddBooksView from "./Views/AddBooksView";
import SettingsView from "./Views/SettingsView";

const routes = [
  {
    path: "/",
    element: <Navigate to="/books" />,
  },
  {
    path: "/authors",
    element: <AuthorsView />,
  },
  {
    path: "/books",
    element: <BooksView />,
  },
  { path: "/timeline", element: <TimelineView /> },
  {
    path: "/add-books",
    element: <AddBooksView />,
  },
  {
    path: "/settings",
    element: <SettingsView />,
  },
];

export default routes;
