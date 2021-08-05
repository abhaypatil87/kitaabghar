import React from "react";
import { Helmet } from "react-helmet";
import { Container } from "@material-ui/core";

import ManualEntryView from "./ManualEntryView";
import SearchEntryView from "./SearchEntryView";
import { FullWidthTabs } from "../../components/common";

const AddBooksView = () => {
  const renderHelmet = () => {
    return (
      <Helmet>
        <title>{`Add Books | Home Library`}</title>
        <meta
          name="description"
          content={`Add books into the library by ISBN or Keywords search.`}
        />
      </Helmet>
    );
  };

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
  return (
    <Container maxWidth="lg">
      {renderHelmet()}
      <FullWidthTabs tabs={tabs} />
    </Container>
  );
};

export default AddBooksView;
