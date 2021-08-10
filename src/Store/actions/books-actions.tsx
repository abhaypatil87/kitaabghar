import { SERVER } from "../../utils/crud";
import { booksActions } from "../store";
import { notificationsActions } from "../slices/notifications-slice";
import { dispatchError, dispatchSuccess } from "./actionUtils";
import { RequestHeader } from "../../utils/RequestHeader";
import { BookType, Method, Status } from "../../declarations";

export const fetchBooks = () => {
  return async (dispatch: Function) => {
    dispatch(notificationsActions.clearNotifications());
    const fetchData = async () => {
      const response = await fetch(`${SERVER}/api/books`, {
        headers: new RequestHeader().addAuthorisation().getHeader(),
      });
      return await response.json();
    };

    try {
      const response = await fetchData();
      if (response.status !== Status.SUCCESS) {
        dispatchError(dispatch, "GET_BOOKS", response.message);
        return;
      }
      dispatch(booksActions.initiate(response.data.books));
      dispatchSuccess(dispatch, "GET_BOOKS", response.message);
    } catch (error) {
      dispatchError(dispatch, "GET_BOOKS", error.message);
    }
  };
};

export const editBook = (book: BookType) => {
  return async (dispatch: Function) => {
    dispatch(notificationsActions.clearNotifications());
    const updateData = async () => {
      const response = await fetch(`${SERVER}/api/books/${book.book_id}`, {
        method: Method.PUT,
        body: JSON.stringify(book),
        headers: new RequestHeader()
          .addContentType("application/json")
          .addAuthorisation()
          .getHeader(),
      });

      if (!response.ok) {
        throw new Error("Error occurred while updating the book details");
      }
      return await response.json();
    };

    try {
      const response = await updateData();
      if (response.status !== Status.SUCCESS) {
        dispatchError(dispatch, "EDIT_BOOK", response.message);
        return;
      }
      dispatch(booksActions.update(response.data.book));
      dispatchSuccess(dispatch, "EDIT_BOOK", response.message);
    } catch (error) {
      dispatchError(dispatch, "EDIT_BOOK", error.message);
    }
  };
};

export const removeBook = (bookId: number) => {
  return async (dispatch: Function) => {
    dispatch(notificationsActions.clearNotifications());
    const removeData = async () => {
      const response = await fetch(`${SERVER}/api/books/${bookId}`, {
        method: Method.DELETE,
        headers: new RequestHeader().addAuthorisation().getHeader(),
      });

      if (!response.ok) {
        throw new Error("Error occurred while deleting the book");
      }
      return await response.json();
    };

    try {
      const response = await removeData();
      if (response.status !== Status.SUCCESS) {
        dispatchError(dispatch, "REMOVE_BOOK", response.message);
        return;
      }
      dispatch(booksActions.remove(bookId));
      dispatchSuccess(dispatch, "REMOVE_BOOK", response.message);
    } catch (error) {
      dispatchError(dispatch, "REMOVE_BOOK", error.message);
    }
  };
};

export const createBook = (book: { isbn: string } | BookType) => {
  return async (dispatch: Function) => {
    dispatch(notificationsActions.clearNotifications());
    const createData = async () => {
      const response = await fetch(`${SERVER}/api/books`, {
        method: Method.POST,
        body: JSON.stringify(book),
        headers: new RequestHeader()
          .addContentType("application/json")
          .addAuthorisation()
          .getHeader(),
      });

      return await response.json();
    };

    try {
      const response = await createData();
      if (response.status !== Status.SUCCESS) {
        dispatchError(dispatch, "ADD_BOOK", response.message);
        return;
      }
      dispatch(booksActions.create(response.data.book));
      dispatchSuccess(dispatch, "ADD_BOOK", response.message);
    } catch (error) {
      dispatchError(dispatch, "ADD_BOOK", error.message);
    }
  };
};
