import { AlertColor, Snackbar } from "@material-ui/core";
import * as React from "react";
import MuiAlert, { AlertProps } from "@material-ui/core/Alert";

type SnackBarProps = {
  open: boolean;
  onClose: (event?: React.SyntheticEvent, reason?: string) => void;
  severity: AlertColor | undefined;
  message: string;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = (props: SnackBarProps) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={5000}
      onClose={props.onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      {/*<Alert onClose={props.onClose} severity={props.severity}>*/}
      {/*  {props.message}*/}
      {/*</Alert>*/}
      <Alert
        onClose={props.onClose}
        severity={props.severity}
        sx={{ width: "100%" }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
