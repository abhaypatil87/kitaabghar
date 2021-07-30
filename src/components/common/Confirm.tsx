import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { LibButton } from "./LibButton";

type ConfirmProps = {
  onClose: Function;
  onOkay: Function;
  open: boolean;
  message: string;
  keepMounted: boolean;
};

function Confirm(props: ConfirmProps) {
  const { onClose, onOkay, open, ...other } = props;

  return (
    <Dialog disableEscapeKeyDown maxWidth="xs" open={open} {...other}>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent dividers>
        <span>{props.message}</span>
      </DialogContent>
      <DialogActions>
        <LibButton
          size="small"
          onClick={() => {
            onClose();
          }}
          variant={"outlined"}
        >
          Cancel
        </LibButton>
        <LibButton
          size="small"
          variant="contained"
          color="error"
          onClick={() => {
            onOkay();
          }}
        >
          Okay
        </LibButton>
      </DialogActions>
    </Dialog>
  );
}

export default Confirm;
