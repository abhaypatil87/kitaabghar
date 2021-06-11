import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";

const Author = (props) => {
  return (
    <Box component="div" marginTop={2}>
      <Grid item xs={12} sm container>
        <Grid item xs>
          <Typography gutterBottom variant="subtitle1">
            {props.author}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Author;
