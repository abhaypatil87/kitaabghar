import React from "react";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import Author from "./Author";

const Authors = () => {
  const authorsStore = useSelector((state) => state.authors.authors);
  return (
    <Box component="div">
      {authorsStore.map((author) => (
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
