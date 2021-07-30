import { notificationsActions } from "../slices/notifications-slice";
import { Status } from "../../utils/crud";

export const dispatchError = (
  dispatch: Function,
  lastOp: string,
  message: string
) =>
  dispatch(
    notificationsActions.showNotification({
      lastOp,
      status: Status.ERROR,
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
      status: Status.SUCCESS,
      message,
    })
  );
