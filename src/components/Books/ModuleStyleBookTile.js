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
    <ListStyleBookTile {...props} onDelete={props.onDelete} />
  ) : (
    <Box
      component="div"
      marginTop={2}
      className={bookTitleStyles.cover}
      onClick={onClickHandler}
    >
      <img
        src={props.thumbnail_url}
        alt={props.title}
        className={bookTitleStyles.coverImage}
      />
      <Box component="div" className={bookTitleStyles.coverTitle}>
        {props.title}
      </Box>
    </Box>
  );
};

export default ModuleStyleBookTile;
