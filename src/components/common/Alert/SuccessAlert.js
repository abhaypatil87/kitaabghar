import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
import React from "react";

const SuccessAlert = (props) => {
  return (
    <Alert
      severity="success"
      className={props.className}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={props.onClose}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {props.message}
    </Alert>
  );
};

export default SuccessAlert;
