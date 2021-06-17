import React, { useState } from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";

import bookTitleStyles from "./BookTile.module.css";
import { ListStyleBookTile } from "./index";

const useStyles = makeStyles((theme) => ({
  title: {
    cursor: "pointer",
  },
}));

const HeadlineStyleBookTile = (props) => {
  const [listStyleMode, setListStyleMode] = useState(false);
  const onClickHandler = () => {
    setListStyleMode((oldValue) => !oldValue);
  };

  const classes = useStyles();
  return listStyleMode ? (
    <ListStyleBookTile {...props} onDelete={props.onDelete} />
  ) : (
    <Box
      component="div"
      marginTop={2}
      className={classes.title}
      onClick={onClickHandler}
      aria-label={`${props.title} by ${props.author}`}
      tabIndex={0}
    >
      <Grid item xs={12} sm container>
        <Grid item xs>
          <Typography variant="body1">{props.title}</Typography>
          <Typography
            variant="subtitle2"
            className={bookTitleStyles.secondaryDetail}
          >
            {props.author}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeadlineStyleBookTile;
