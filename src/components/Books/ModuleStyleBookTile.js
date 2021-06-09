import React from "react";
import Box from "@material-ui/core/Box";
import bookTitleStyles from "./BookTile.module.css";

const ModuleStyleBookTile = (props) => {
  return (
    <Box component="div" className={bookTitleStyles.cover}>
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
