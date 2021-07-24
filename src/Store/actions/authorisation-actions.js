import { notificationsActions } from "../slices/notifications-slice";
import { SERVER_PORT, SERVER_URL, SUCCESS } from "../../utils/crud";
import { dispatchError, dispatchSuccess } from "./actionUtils";
import { authorisationActions } from "../store";
import { RequestHeader } from "../../utils/RequestHeader";

export const signOut = () => {
  return async (dispatch) => {
    dispatch(notificationsActions.clearNotifications());
    const signOutUser = () => {
      return { status: SUCCESS };
      // const response = await fetch(
      //   `http://${SERVER_URL}:${SERVER_PORT}/api/login`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify(signInData),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      //
      // if (!response.ok) {
      //   throw new Error("Error occurred while signing in");
      // }
      // return await response.json();
    };

    try {
      const response = signOutUser();
      if (response.status !== SUCCESS) {
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

export const signIn = (signInData) => {
  return async (dispatch) => {
    dispatch(notificationsActions.clearNotifications());
    const signInUser = async () => {
      const response = await fetch(
        `http://${SERVER_URL}:${SERVER_PORT}/api/signin`,
        {
          method: "POST",
          body: JSON.stringify(signInData),
          headers: new RequestHeader()
            .addContentType("application/json")
            .getHeader(),
        }
      );

      const parsedResponse = await response.json();
      if (!response.ok) {
        throw new Error(parsedResponse.message);
      }
      return parsedResponse;
    };

    try {
      const response = await signInUser();
      if (response.status !== SUCCESS) {
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

export const signUp = (signUpData) => {
  return async (dispatch) => {
    dispatch(notificationsActions.clearNotifications());
    const signUpUser = async () => {
      const response = await fetch(
        `http://${SERVER_URL}:${SERVER_PORT}/api/signup`,
        {
          method: "POST",
          body: JSON.stringify(signUpData),
          headers: new RequestHeader()
            .addContentType("application/json")
            .getHeader(),
        }
      );

      const parsedResponse = await response.json();
      if (!response.ok) {
        throw new Error(parsedResponse.message);
      }
      return parsedResponse;
    };

    try {
      const response = await signUpUser();
      if (response.status !== SUCCESS) {
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
