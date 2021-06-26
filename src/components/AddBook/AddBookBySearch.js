import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import IsbnSearchCreate from "./IsbnSearchCreate";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import KeywordsSearchCreate from "./KeywordsSearchCreate";

const useStyles = makeStyles((theme) => ({
  m0: {
    marginLeft: "0px",
  },
  m1: {
    marginTop: theme.spacing(1),
  },
  m2: {
    marginTop: theme.spacing(2),
  },
}));

const AddBookBySearch = () => {
  const [createState, setCreateState] = useState("isbn");
  const handleRadioChange = (event) => {
    setCreateState(event.target.value);
  };

  const classes = useStyles();
  return (
    <>
      <RadioGroup
        value={createState}
        row
        aria-label="position"
        className={classes.m2}
        onChange={handleRadioChange}
      >
        <FormControlLabel
          className={classes.m0}
          value="isbn"
          control={<Radio />}
          label="ISBN Search"
          labelPlacement="start"
        />
        <FormControlLabel
          value="keywords"
          control={<Radio />}
          label="Keywords Search"
          labelPlacement="start"
        />
      </RadioGroup>
      {createState === "isbn" && <IsbnSearchCreate />}
      {createState === "keywords" && <KeywordsSearchCreate />}
    </>
  );
};

export default AddBookBySearch;
