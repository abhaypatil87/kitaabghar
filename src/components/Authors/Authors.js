import React from "react";
import Box from "@material-ui/core/Box";
import Author from "./Author";

const Authors = (props) => {
  return (
    <Box component="div">
      {props.authors.map((author) => (
        <Author
          key={author.author_id}
          author_id={author.author_id}
          first_name={author.first_name}
          last_name={author.last_name}
        />
      ))}
    </Box>
  );
};

export default Authors;
