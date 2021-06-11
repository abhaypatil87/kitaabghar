import React from "react";
import AddBookBySearch from "../components/AddBook/AddBookBySearch";
import AddBookByManualEntry from "../components/AddBook/AddBookByManualEntry";
import FullWidthTabs from "../components/common/FullWidthTabs/FullWidthTabs";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 10px 10px 10px",
  },
}));

const AddBooksView = () => {
  const classes = useStyles();
  const tabs = [
    {
      index: 0,
      value: 0,
      title: "Search",
      body: <AddBookBySearch />,
    },
    {
      index: 1,
      value: 1,
      title: "Manual Entry",
      body: <AddBookByManualEntry />,
    },
  ];
  return (
    <Box component="div" className={classes.root}>
      <FullWidthTabs tabs={tabs} />
    </Box>
  );
};

export default AddBooksView;
