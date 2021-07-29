import { configureStore } from "@reduxjs/toolkit";
import {
  authors,
  books,
  notifications,
  viewMode,
  apiSettingsSlice,
  authorisationSlice,
} from "./slices";
import LoggedInUser from "./LoggedInUser";
import { AuthorType, BookTileProps, ThirdPartyApisType } from "../declarations";
import { AlertColor } from "@material-ui/core";

const store = configureStore({
  reducer: {
    authors: authors.reducer,
    books: books.reducer,
    viewMode: viewMode.reducer,
    notifications: notifications.reducer,
    apiSettings: apiSettingsSlice.reducer,
    authorisation: authorisationSlice.reducer,
  },
});

type Notification = {
  lastOp: string;
  status: AlertColor | undefined;
  message: string;
};
export interface RootState {
  authors: { authors: Array<AuthorType> };
  books: { books: Array<BookTileProps> };
  viewMode: { viewMode: string };
  notifications: {
    notification: Notification | null;
  };
  apiSettings: {
    thirdPartyApis: ThirdPartyApisType;
  };
  authorisation: any;
}

export const notificationActions = notifications.actions;
export const authorsActions = authors.actions;
export const booksActions = books.actions;
export const viewModeActions = viewMode.actions;
export const apiSettingsActions = apiSettingsSlice.actions;
export const authorisationActions = authorisationSlice.actions;
export const loggedInUser = LoggedInUser.getInstance();

export default store;
