import React from "react";
import { AddBookByManualEntry, AddBookBySearch } from "../components/AddBook/";
import { FullWidthTabs } from "../components/common/";

const AddBooksView = () => {
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
  return <FullWidthTabs tabs={tabs} />;
};

export default AddBooksView;
