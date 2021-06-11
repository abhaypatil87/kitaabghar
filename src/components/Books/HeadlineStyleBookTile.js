import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import bookTitleStyles from "./BookTile.module.css";

const HeadlineStyleBookTile = (props) => {
  return (
    <Box component="div" marginTop={2}>
      <Grid item xs={12} sm container>
        <Grid item xs>
          <Typography gutterBottom variant="h6">
            {props.title}
          </Typography>
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
