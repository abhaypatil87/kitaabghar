import { notificationsActions } from "../slices/notifications-slice";
import { SERVER, SUCCESS } from "../../utils/crud";
import { dispatchError, dispatchSuccess } from "./actionUtils";
import { apiSettingsActions } from "../store";
import { RequestHeader } from "../../utils/RequestHeader";

export const fetchThirdPartyApis = () => {
  return async (dispatch) => {
    dispatch(notificationsActions.clearNotifications());
    const fetchData = async () => {
      const response = await fetch(`${SERVER}/api/third_party_apis`, {
        headers: new RequestHeader().addAuthorisation().getHeader(),
      });
      return await response.json();
    };

    try {
      const response = await fetchData();
      if (response.status !== SUCCESS) {
        dispatchError(dispatch, "GET_THIRD_PARTY_APIS", response.message);
        return;
      }
      dispatch(apiSettingsActions.initiate(response));
    } catch (error) {
      dispatchError(dispatch, "GET_APIS", error.message);
    }
  };
};

export const saveApiSettings = (apiSettings) => {
  return async (dispatch) => {
    dispatch(notificationsActions.clearNotifications());
    const updateData = async () => {
      const response = await fetch(`${SERVER}/api/third_party_apis`, {
        method: "PUT",
        body: JSON.stringify(apiSettings),
        headers: new RequestHeader()
          .addAuthorisation()
          .addContentType("application/json")
          .getHeader(),
      });

      if (!response.ok) {
        throw new Error("Error occurred while saving the API settings");
      }
      return await response.json();
    };

    try {
      const response = await updateData();
      if (response.status !== SUCCESS) {
        dispatchError(dispatch, "UPDATE_API_SETTINGS", response.message);
        return;
      }

      dispatch(apiSettingsActions.initiate(response));
      dispatchSuccess(dispatch, "UPDATE_API_SETTINGS", response.message);
    } catch (error) {
      dispatchError(dispatch, "UPDATE_API_SETTINGS", error.message);
    }
  };
};
