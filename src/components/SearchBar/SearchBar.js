import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, InputBase, IconButton } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles({
  root: {
    padding: "10px 10px 10px 10px",
    display: "flex",
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

const SearchBar = (props) => {
  const searchRef = useRef("");
  const [searchDisabled, setSearchDisabled] = useState(true);
  const classes = useStyles();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const searchTerm = searchRef.current.value;
    if (searchTerm.trim().length === 0) {
      setSearchDisabled(true);
    } else {
      setSearchDisabled(false);
    }
    props.onSearch(searchTerm);
  };

  const clearSearchHandler = () => {
    searchRef.current.value = "";
    setSearchDisabled(true);
    props.onSearch(searchRef.current.value);
  };

  return (
    <Paper
      component="form"
      onSubmit={formSubmitHandler}
      variant="outlined"
      className={classes.root}
    >
      <InputBase
        className={classes.input}
        placeholder="Search Books"
        spellCheck={false}
        name={"searchbox"}
        inputMode={"search"}
        inputRef={searchRef}
        inputProps={{ "aria-label": "search books" }}
      />
      {!searchDisabled && (
        <IconButton
          type="button"
          aria-label={"Clear Search"}
          className={classes.iconButton}
          onClick={clearSearchHandler}
        >
          <ClearIcon />
        </IconButton>
      )}
      <IconButton
        type="submit"
        aria-label={"Search Books"}
        className={classes.iconButton}
        aria-disabled={searchDisabled}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
