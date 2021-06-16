import React, { useEffect, useState } from "react";
import { SERVER_PORT, SERVER_URL } from "../utils/crud";
import Authors from "../components/Authors/Authors";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 10px 10px 10px",
  },
}));

const AuthorsView = () => {
  const [authors, setAuthors] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const fetchAllAuthors = async () => {
      let response = await fetch(
        `http://${SERVER_URL}:${SERVER_PORT}/api/authors`
      );
      response = await response.json();
      setAuthors(response.data.authors);
    };
    fetchAllAuthors();

    return () => {
      console.log("AuthorsView is being unmounted");
    };
  }, []);

  return (
    <Box component="div" className={classes.root}>
      <Authors authors={authors} />
    </Box>
  );
};

export default AuthorsView;
