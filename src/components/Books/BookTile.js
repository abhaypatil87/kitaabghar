import React, { useContext, useState } from "react";
import bookTitleStyles from "./BookTile.module.css";
import ExpandedBookTile from "./ExpandedBookTile";
import BookContext from "../../Store/book-store";

const BookTile = (props) => {
  const { viewAs } = useContext(BookContext);
  const [expanded, setExpanded] = useState(false);

  const handleTitleClick = (event) => {
    event.preventDefault();
    setExpanded((prevState) => {
      return !prevState;
    });
  };

  return (
    <React.Fragment>
      {expanded ? (
        <ExpandedBookTile
          {...props}
          onDelete={props.onDelete}
          onClick={handleTitleClick}
        />
      ) : (
        <div className={bookTitleStyles.cover} onClick={handleTitleClick}>
          <img
            src={props.thumbnail_url}
            alt={props.title}
            className={bookTitleStyles.coverImage}
          />
          <div className={bookTitleStyles.coverTitle}>{props.title}</div>
        </div>
      )}
    </React.Fragment>
  );
};

export default BookTile;
