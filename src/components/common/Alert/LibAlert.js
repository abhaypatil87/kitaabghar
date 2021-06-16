import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";

const LibAlert = (props) => {
  return (
    <Alert
      {...props}
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

export default LibAlert;
