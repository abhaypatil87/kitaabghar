import React, { useCallback, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../Store/actions";
import { Confirm } from "../../components/common";
import { LibButton } from "../../components/common/LibButton";

const AccountSettingsView: React.FC = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const removeClickHandler = () => {
    dispatch(deleteAccount());
  };

  const cancelDelete = useCallback(() => {
    setIsOpen(false);
  }, []);
  const confirmDeleteAccount = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ChevronRightIcon />}>
          <div>
            <Typography variant={"h1"}>User Account Settings</Typography>
            <Typography variant={"subtitle1"}>
              Control your Kitaabghar account
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Box marginTop={1}>
            <LibButton
              variant={"contained"}
              color="error"
              onClick={confirmDeleteAccount}
            >
              {"Delete Account"}
            </LibButton>
            <Typography
              component="div"
              sx={{ mt: 1, ml: 1 }}
              variant={"caption"}
            >
              NOTE: All the associated books with this account will also be
              removed.
              <br />
              We recommend you export your library before performing this
              action.
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Confirm
        message={
          "We are sorry that you have decided to delete your Kitaabghar account." +
          "This is a permanent action. Are you sure?"
        }
        keepMounted={false}
        open={isOpen}
        onClose={cancelDelete}
        onOkay={removeClickHandler}
      />
    </>
  );
};

export default AccountSettingsView;
