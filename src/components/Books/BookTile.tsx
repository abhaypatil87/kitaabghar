import React from "react";

import ListStyleBookTile from "./ListStyleBookTile";
import ModuleStyleBookTile from "./ModuleStyleBookTile";
import HeadlineStyleBookTile from "./HeadlineStyleBookTile";
import { BookTileProps, viewState } from "../../declarations";

const BookTile: (props: BookTileProps) => JSX.Element = (
  props: BookTileProps
) => {
  return (
    <>
      {props.viewMode === viewState.LIST ? (
        <ListStyleBookTile {...props} />
      ) : props.viewMode === viewState.MODULE ? (
        <ModuleStyleBookTile {...props} />
      ) : (
        <HeadlineStyleBookTile {...props} />
      )}
    </>
  );
};

export default BookTile;
