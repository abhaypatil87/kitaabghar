import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Authors } from "../components/Authors";
import { useDispatch } from "react-redux";
import { fetchAuthors } from "../Store/actions";

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
    <div className={classes.root}>
      <Authors />
    </div>
  );
};

export default AuthorsView;
