import React, { useState } from "react";
import bookTitleStyles from "./BookTile.module.css";
import ExpandedBookTile from "./ExpandedBookTile";

const BookTile = (props) => {
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
        <ExpandedBookTile {...props} onClick={handleTitleClick} />
      ) : (
        <div className={bookTitleStyles.cover} onClick={handleTitleClick}>
          <img
            src={props.thumbnailUrl}
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
