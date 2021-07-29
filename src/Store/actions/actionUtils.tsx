import { notificationsActions } from "../slices/notifications-slice";
import { ERROR, SUCCESS } from "../../utils/crud";

export const dispatchError = (
  dispatch: Function,
  lastOp: string,
  message: string
) =>
  dispatch(
    notificationsActions.showNotification({
      lastOp,
      status: ERROR,
      message,
    })
  );

export const dispatchSuccess = (
  dispatch: Function,
  lastOp: string,
  message: string
) =>
  dispatch(
    notificationsActions.showNotification({
      lastOp,
      status: SUCCESS,
      message,
    })
  );
