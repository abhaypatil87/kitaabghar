import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { LibButton } from "./LibButton";

function Confirm(props) {
  const { onClose, onOkay, open, ...other } = props;

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onOkay();
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent dividers>
        <span>{props.message}</span>
      </DialogContent>
      <DialogActions>
        <LibButton size="small" onClick={handleCancel} variant={"secondary"}>
          Cancel
        </LibButton>
        <LibButton
          size="small"
          variant="contained"
          color="primary"
          onClick={handleOk}
        >
          Okay
        </LibButton>
      </DialogActions>
    </Dialog>
  );
}

export default Confirm;
