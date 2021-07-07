import React, { useState } from "react";

import IsbnSearchCreate from "./IsbnSearchCreate";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import KeywordsSearchCreate from "./KeywordsSearchCreate";
import { experimentalStyled as styled } from "@material-ui/core/styles";

const SearchRadioGroup = styled(RadioGroup)(({ theme }) => ({
  marginTop: `${theme.spacing(2)}`,
}));

const AddBookBySearch = () => {
  const [createState, setCreateState] = useState("isbn");
  const handleRadioChange = (event) => {
    setCreateState(event.target.value);
  };

  return (
    <>
      <SearchRadioGroup value={createState} row onChange={handleRadioChange}>
        <FormControlLabel
          style={{ marginLeft: "0px" }}
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
      </SearchRadioGroup>
      {createState === "isbn" && <IsbnSearchCreate />}
      {createState === "keywords" && <KeywordsSearchCreate />}
    </>
  );
};

export default AddBookBySearch;
