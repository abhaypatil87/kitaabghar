import { notificationsActions } from "../slices/notifications-slice";
import { ERROR, SUCCESS } from "../../utils/crud";

export const dispatchError = (dispatch, lastOp, message) =>
  dispatch(
    notificationsActions.showNotification({
      lastOp,
      status: ERROR,
      message,
    })
  );

export const dispatchSuccess = (dispatch, lastOp, message) =>
  dispatch(
    notificationsActions.showNotification({
      lastOp,
      status: SUCCESS,
      message,
    })
  );
