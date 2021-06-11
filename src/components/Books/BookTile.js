import React, { useContext } from "react";
import BookContext from "../../Store/book-store";
import ListStyleBookTile from "./ListStyleBookTile";
import ModuleStyleBookTile from "./ModuleStyleBookTile";
import HeadlineStyleBookTile from "./HeadlineStyleBookTile";
import { viewState } from "../../utils/bookUtils";

const BookTile = (props) => {
  const { viewAs } = useContext(BookContext);

  const bookTile =
    viewAs === viewState.LIST ? (
      <ListStyleBookTile {...props} onDelete={props.onDelete} />
    ) : viewAs === viewState.MODULE ? (
      <ModuleStyleBookTile {...props} />
    ) : (
      <HeadlineStyleBookTile {...props} />
    );

  return <React.Fragment>{bookTile}</React.Fragment>;
};

export default BookTile;
