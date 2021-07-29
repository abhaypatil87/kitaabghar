import { Method, SERVER, SUCCESS } from "../../utils/crud";
import { authorsActions } from "../store";
import { notificationsActions } from "../slices/notifications-slice";
import { dispatchError, dispatchSuccess } from "./actionUtils";
import { RequestHeader } from "../../utils/RequestHeader";
import { AuthorType } from "../../declarations";

export const fetchAuthors = () => {
  return async (dispatch: Function) => {
    dispatch(notificationsActions.clearNotifications());
    const fetchData = async () => {
      const response = await fetch(`${SERVER}/api/authors`, {
        headers: new RequestHeader().addAuthorisation().getHeader(),
      });

      if (!response.ok) {
        throw new Error("Error occurred while fetching the list of authors");
      }
      return await response.json();
    };

    try {
      const response = await fetchData();
      if (response.status !== SUCCESS) {
        dispatchError(dispatch, "GET_AUTHORS", response.message);
        return;
      }
      dispatch(authorsActions.initiate(response));
    } catch (error) {
      dispatchError(dispatch, "GET_AUTHORS", error.message);
    }
  };
};

export const editAuthor = (author: AuthorType) => {
  return async (dispatch: Function) => {
    dispatch(notificationsActions.clearNotifications());
    const updateData = async () => {
      const response = await fetch(
        `${SERVER}/api/authors/${author.author_id}`,
        {
          method: Method.PUT,
          body: JSON.stringify(author),
          headers: new RequestHeader()
            .addContentType("application/json")
            .addAuthorisation()
            .getHeader(),
        }
      );

      if (!response.ok) {
        throw new Error("Error occurred while updating the author details");
      }
      return await response.json();
    };

    try {
      const response = await updateData();
      if (response.status !== SUCCESS) {
        dispatchError(dispatch, "EDIT_AUTHOR", response.message);
        return;
      }

      dispatch(authorsActions.edit(response));
      dispatchSuccess(dispatch, "EDIT_AUTHOR", response.message);
    } catch (error) {
      dispatchError(dispatch, "EDIT_AUTHOR", error.message);
    }
  };
};
