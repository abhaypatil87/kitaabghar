import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 10px 10px 10px",
    display: "flex",
    margin: "10px",
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();

  return (
    <Paper component="form" variant="outlined" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search Books"
        inputProps={{ "aria-label": "search books" }}
        onChange={props.onSearch}
      />
      <IconButton type="submit" className={classes.iconButton} disabled>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
