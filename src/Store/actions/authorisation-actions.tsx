import { notificationsActions } from "../slices/notifications-slice";
import { SERVER } from "../../utils/crud";
import { dispatchError, dispatchSuccess } from "./actionUtils";
import { authorisationActions } from "../store";
import { RequestHeader } from "../../utils/RequestHeader";
import { Method, SignInProps, SignUpProps, Status } from "../../declarations";

export const signOut = () => {
  return async (dispatch: Function) => {
    dispatch(notificationsActions.clearNotifications());
    const signOutUser = () => {
      return { status: Status.SUCCESS, message: "" };
    };

    try {
      const response: { status: string; message: string } = signOutUser();
      if (response.status !== Status.SUCCESS) {
        dispatchError(dispatch, "SIGN_OUT", response.message);
        return;
      }

      dispatch(authorisationActions.signOut(response));
      dispatchSuccess(dispatch, "SIGN_OUT", response.message);
    } catch (error) {
      dispatchError(dispatch, "SIGN_OUT", error.message);
    }
  };
};

export const signIn = (signInData: SignInProps) => {
  return async (dispatch: Function) => {
    dispatch(notificationsActions.clearNotifications());
    const signInUser = async () => {
      const response = await fetch(`${SERVER}/api/signin`, {
        method: Method.POST,
        body: JSON.stringify(signInData),
        headers: new RequestHeader()
          .addContentType("application/json")
          .getHeader(),
      });

      const parsedResponse = await response.json();
      if (!response.ok) {
        throw new Error(parsedResponse.message);
      }
      return parsedResponse;
    };

    try {
      const response = await signInUser();
      if (response.status !== Status.SUCCESS) {
        dispatchError(dispatch, "SIGN_IN", response.message);
        return;
      }

      dispatch(authorisationActions.signIn(response));
      dispatchSuccess(dispatch, "SIGN_IN", response.message);
      window.location.href = "/";
    } catch (error) {
      dispatchError(dispatch, "SIGN_IN", error.message);
    }
  };
};

export const signUp = (signUpData: SignUpProps) => {
  return async (dispatch: Function) => {
    dispatch(notificationsActions.clearNotifications());
    const signUpUser = async () => {
      const response = await fetch(`${SERVER}/api/signup`, {
        method: Method.POST,
        body: JSON.stringify(signUpData),
        headers: new RequestHeader()
          .addContentType("application/json")
          .getHeader(),
      });

      const parsedResponse = await response.json();
      if (!response.ok) {
        throw new Error(parsedResponse.message);
      }
      return parsedResponse;
    };

    try {
      const response = await signUpUser();
      if (response.status !== Status.SUCCESS) {
        dispatchError(dispatch, "SIGN_UP", response.message);
        return;
      }

      dispatch(authorisationActions.signIn(response));
      dispatchSuccess(dispatch, "SIGN_UP", response.message);
      window.location.href = "/";
    } catch (error) {
      dispatchError(dispatch, "SIGN_UP", error.message);
    }
  };
};

export const deleteAccount = () => {
  return async (dispatch: Function) => {
    dispatch(notificationsActions.clearNotifications());
    const deleteAccount = async () => {
      const response = await fetch(`${SERVER}/api/me`, {
        method: Method.DELETE,
        headers: new RequestHeader().addAuthorisation().getHeader(),
      });

      const parsedResponse = await response.json();
      if (!response.ok) {
        throw new Error(parsedResponse.message);
      }
      return parsedResponse;
    };

    try {
      const response = await deleteAccount();
      if (response.status !== Status.SUCCESS) {
        dispatchError(dispatch, "DELETE_ACCOUNT", response.message);
        return;
      }
      dispatch(authorisationActions.signOut(response));
    } catch (error) {
      dispatchError(dispatch, "DELETE_ACCOUNT", error.message);
    }
  };
};
