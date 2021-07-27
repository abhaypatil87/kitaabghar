import { useRef, useState } from "react";
import { alpha } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Typography,
  Avatar,
  IconButton,
  styled,
} from "@material-ui/core";
import { MenuPopover } from "../components/common";
import { signOut } from "../Store/actions";
import { useDispatch } from "react-redux";
import { LOCAL_STORAGE_USER_KEY } from "../utils/crud";
import { LibButton } from "../components/common/LibButton";

const SignOutButton = styled(LibButton)({
  color: "#3c4043",
  border: "1px solid #dadce0",
  "&:hover": {
    backgroundColor: "#898a8b",
    borderColor: "#898a8b",
    color: "white",
  },
});

const AccountPopover = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));
  const [user] = useState(loggedInUser);
  const fullName = `${user.first_name} ${user.last_name}`;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(signOut());
    history("/sign-in");
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        {user.image_url !== null && <Avatar src={user.image_url} />}
        {user.image_url === null && (
          <Avatar alt={fullName}>{fullName.charAt(0)}</Avatar>
        )}
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user.email}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ p: 2, pt: 1.5 }}>
          <SignOutButton fullWidth variant="outlined" onClick={handleLogout}>
            Sign Out
          </SignOutButton>
        </Box>
      </MenuPopover>
    </>
  );
};

export default AccountPopover;
