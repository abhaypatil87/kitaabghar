import React from "react";
import { useSelector } from "react-redux";

import ListStyleBookTile from "./ListStyleBookTile";
import ModuleStyleBookTile from "./ModuleStyleBookTile";
import HeadlineStyleBookTile from "./HeadlineStyleBookTile";
import { viewState } from "../../utils/crud";

const BookTile = (props) => {
  const viewMode = useSelector((state) => state.viewMode.viewMode);
  const bookTile =
    viewMode === viewState.LIST ? (
      <ListStyleBookTile {...props} onDelete={props.onDelete} />
    ) : viewMode === viewState.MODULE ? (
      <ModuleStyleBookTile {...props} />
    ) : (
      <HeadlineStyleBookTile {...props} />
    );

  return <>{bookTile}</>;
};

export default BookTile;
