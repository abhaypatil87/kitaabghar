import React from "react";
import { FullWidthTabs } from "../../components/common";

import ManualEntryView from "./ManualEntryView";
import SearchEntryView from "./SearchEntryView";

const AddBooksView = () => {
  const tabs = [
    {
      index: 0,
      value: 0,
      title: "Search",
      body: <SearchEntryView />,
    },
    {
      index: 1,
      value: 1,
      title: "Manual Entry",
      body: <ManualEntryView />,
    },
  ];
  return <FullWidthTabs tabs={tabs} />;
};

export default AddBooksView;
