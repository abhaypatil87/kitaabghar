import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Toolbar, CssBaseline } from "@material-ui/core";

import Sidebar from "../../components/Sidebar/Sidebar";
import { Header } from "../../components/Header";

const LibraryLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((mobileOpen) => !mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default LibraryLayout;
