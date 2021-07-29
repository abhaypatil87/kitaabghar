import React, { useState } from "react";
import { Box, Tab, Tabs, AppBar, TabProps } from "@material-ui/core";

type FullWidthTabsProps = {
  tabs: Array<TabProps>;
};

type TabPanelProps = {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const FullWidthTabs = (props: FullWidthTabsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {props.tabs.map((tab: any) => (
            <Tab key={tab.index} label={tab.title} {...a11yProps(tab.index)} />
          ))}
        </Tabs>
      </AppBar>
      {props.tabs.map((tab: any) => (
        <TabPanel key={tab.index} index={tab.index} value={value}>
          {tab.body}
        </TabPanel>
      ))}
    </>
  );
};

export default FullWidthTabs;
