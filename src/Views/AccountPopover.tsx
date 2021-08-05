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
import { LibButton } from "../components/common/LibButton";
import { loggedInUser } from "../Store/store";
import { User } from "../declarations";

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
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [user] = useState<User>(loggedInUser.getLoggedInUser());
  const fullName = user !== null ? `${user.first_name} ${user.last_name}` : "";
  const ariaLabel = `Home Library Account: ${fullName} (${user.email})`;
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
        aria-label={ariaLabel}
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
        {user && user.image_url !== null && (
          <Avatar src={user.image_url} alt={"profile image"} />
        )}
        {user && user.image_url === null && (
          <Avatar alt={fullName}>{fullName.charAt(0)}</Avatar>
        )}
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user && user.email}
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
