import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/core";

const SnackBar = (props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={5000}
      onClose={props.onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={props.onClose} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
