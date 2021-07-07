import React from "react";
import { makeStyles } from "@material-ui/styles";
import { AddBookByManualEntry, AddBookBySearch } from "../components/AddBook/";
import { FullWidthTabs } from "../components/common/";

const useStyles = makeStyles({
  root: {
    padding: "10px 10px 10px 10px",
  },
});

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
    <div className={classes.root}>
      <FullWidthTabs tabs={tabs} />
    </div>
  );
};

export default AddBooksView;
