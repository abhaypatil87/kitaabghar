import React, { useEffect } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Authors } from "../components/Authors";
import { useDispatch } from "react-redux";
import { fetchAuthors } from "../Store/actions/authors-actions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 10px 10px 10px",
  },
}));

const AuthorsView = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchAuthors());
    return () => {
      console.log("AuthorsView is being unmounted");
    };
  }, [dispatch]);

  return (
    <Box component="div" className={classes.root}>
      <Authors />
    </Box>
  );
};

export default AuthorsView;
