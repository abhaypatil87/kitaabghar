import React from "react";
import { Helmet } from "react-helmet";

const TimelineView = () => {
  const renderHelmet = () => {
    return (
      <Helmet>
        <title>{`Timeline | Kitaabghar`}</title>
        <meta name="description" content={`Manage your reading timeline`} />
      </Helmet>
    );
  };
  return <>{renderHelmet()}</>;
};

export default TimelineView;
