import * as React from "react";
import { Box, Toolbar, Divider, Paper, Drawer } from "@material-ui/core";
import { Link as RouterLink, Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import TimelineIcon from "@material-ui/icons/Timeline";
import SettingsIcon from "@material-ui/icons/Settings";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import QueueOutlinedIcon from "@material-ui/icons/QueueOutlined";

import MenuItem from "./MenuItem";
import Logo from "./Logo";

const drawerWidth = 240;

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "inherit",
  },
});

type SidebarProps = {
  handleDrawerToggle: Function;
  mobileOpen: boolean;
  window?: () => Window;
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { window } = props;
  const classes = useStyles();
  const currentLocation = useLocation();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <Paper component={"div"}>
        <Toolbar>
          <RouterLink to="/" className={classes.link}>
            <Logo />
          </RouterLink>
        </Toolbar>
      </Paper>
      <Divider />
      <Link to="/library/timeline" className={classes.link}>
        <MenuItem
          title="Timeline"
          testid="sidebar-menu-item"
          icon={TimelineIcon}
          active={currentLocation.pathname === "/library/timeline"}
        />
      </Link>
      <Link to="/library/books" className={classes.link}>
        <MenuItem
          title="Books"
          testid="sidebar-menu-item"
          icon={LocalLibraryIcon}
          active={currentLocation.pathname === "/library/books"}
        />
      </Link>
      <Link to="/library/add-books" className={classes.link}>
        <MenuItem
          title="Add Books"
          testid="sidebar-menu-item"
          icon={QueueOutlinedIcon}
          active={currentLocation.pathname === "/library/add-books"}
        />
      </Link>
      <Link to="/library/authors" className={classes.link}>
        <MenuItem
          title="Authors"
          testid="sidebar-menu-item"
          icon={PeopleAltIcon}
          active={currentLocation.pathname === "/library/authors"}
        />
      </Link>
      <Divider />
      <Link to="/library/settings" className={classes.link}>
        <MenuItem
          title="Settings"
          testid="sidebar-menu-item"
          icon={SettingsIcon}
          active={currentLocation.pathname === "/library/settings"}
        />
      </Link>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label="library navigation menu"
    >
      <Drawer
        container={container}
        open={props.mobileOpen}
        variant="temporary"
        onClose={props.handleDrawerToggle.bind(null)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            backgroundColor: "#363740",
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        open
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            backgroundColor: "#363740",
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
