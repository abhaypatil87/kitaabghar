import * as React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountPopover from "../../Views/AccountPopover";
import AppBar from "@material-ui/core/AppBar";
import { Box } from "@material-ui/core";
const drawerWidth = 240;

type HeaderProps = {
  handleDrawerToggle: Function;
};
const Header: React.FC<HeaderProps> = (props) => {
  return (
    <AppBar
      position="fixed"
      color={"default"}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open navigation menu"
          edge="start"
          onClick={props.handleDrawerToggle.bind(null)}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <AccountPopover />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
