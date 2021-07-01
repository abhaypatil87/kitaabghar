import React, { useState } from "react";
import { Box } from "@material-ui/core";

import { ListStyleBookTile } from "./index";
import bookTitleStyles from "./BookTile.module.css";

const ModuleStyleBookTile = (props) => {
  const [listStyleMode, setListStyleMode] = useState(false);
  const onClickHandler = () => {
    setListStyleMode((oldValue) => !oldValue);
  };

  return listStyleMode ? (
    <ListStyleBookTile {...props} />
  ) : (
    <Box
      component="div"
      marginTop={2}
      className={bookTitleStyles.cover}
      onClick={onClickHandler}
      tabIndex={0}
      aria-label={`${props.title} by ${props.author}`}
    >
      <img
        src={props.thumbnail_url}
        alt={props.title}
        className={bookTitleStyles.coverImage}
      />
      <div className={bookTitleStyles.coverTitle}>{props.title}</div>
    </Box>
  );
};

export default ModuleStyleBookTile;
