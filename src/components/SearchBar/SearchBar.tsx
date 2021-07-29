import React, { FormEvent, useRef, useState } from "react";
import { InputBase, IconButton, Paper } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

type SearchBarProps = {
  onSearch: Function;
};

const SearchBar = (props: SearchBarProps) => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [searchDisabled, setSearchDisabled] = useState(true);

  const formSubmitHandler = (event: FormEvent) => {
    if (searchRef.current !== null) {
      event.preventDefault();
      const searchTerm = searchRef.current.value;
      if (searchTerm.trim().length === 0) {
        setSearchDisabled(true);
      } else {
        setSearchDisabled(false);
      }
      props.onSearch(searchTerm);
    }
  };

  const clearSearchHandler = () => {
    if (searchRef.current !== null) {
      searchRef.current.value = "";
      setSearchDisabled(true);
      props.onSearch(searchRef.current.value);
    }
  };

  return (
    <Paper
      elevation={2}
      component={"form"}
      onSubmit={formSubmitHandler}
      sx={{ my: 1, p: 1, display: "flex" }}
    >
      <InputBase
        placeholder="Search Books"
        spellCheck={false}
        name={"searchbox"}
        inputMode={"search"}
        inputRef={searchRef}
        inputProps={{ "aria-label": "search books" }}
        sx={{ flex: 1 }}
      />
      {!searchDisabled && (
        <IconButton
          type="button"
          aria-label={"Clear Search"}
          sx={{ p: 1 }}
          onClick={clearSearchHandler}
        >
          <ClearIcon />
        </IconButton>
      )}
      <IconButton
        type="submit"
        aria-label={"Search Books"}
        sx={{ p: 1 }}
        aria-disabled={searchDisabled}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
