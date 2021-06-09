import React from "react";
import AddBookBySearch from "../components/AddBook/AddBookBySearch";
import AddBookByManualEntry from "../components/AddBook/AddBookByManualEntry";
import FullWidthTabs from "../components/common/FullWidthTabs/FullWidthTabs";

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
