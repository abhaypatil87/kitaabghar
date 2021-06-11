import React from "react";
import Box from "@material-ui/core/Box";
import Author from "./Author";

const Authors = (props) => {
  return (
    <Box component="div">
      {props.authors.map((author) => (
        <Author
          key={author.id}
          author={`${author.first_name} ${author.last_name}`}
        />
      ))}
    </Box>
  );
};

export default Authors;
