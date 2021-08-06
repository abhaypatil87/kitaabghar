import React, { useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

import IsbnSearchEntryView from "./IsbnSearchEntryView";
import KeywordsSearchEntryView from "./KeywordsSearchEntryView";

const SearchRadioGroup = styled(RadioGroup)(({ theme }) => ({
  marginTop: `${theme.spacing(2)}`,
}));

const SearchEntryView = () => {
  const [createState, setCreateState] = useState("isbn");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateState((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <SearchRadioGroup row value={createState} onChange={handleRadioChange}>
        <FormControlLabel
          sx={{ marginLeft: "0px" }}
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
      {createState === "isbn" && <IsbnSearchEntryView />}
      {createState === "keywords" && <KeywordsSearchEntryView />}
    </>
  );
};

export default SearchEntryView;
