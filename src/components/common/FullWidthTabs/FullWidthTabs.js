import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Box, Tab, Tabs } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </Box>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const FullWidthTabs = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box component="div">
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {props.tabs.map((tab) => (
            <Tab key={tab.index} label={tab.title} {...a11yProps(tab.index)} />
          ))}
        </Tabs>
      </AppBar>
      {props.tabs.map((tab) => (
        <TabPanel key={tab.index} index={tab.index} value={value}>
          {tab.body}
        </TabPanel>
      ))}
    </Box>
  );
};

export default FullWidthTabs;
