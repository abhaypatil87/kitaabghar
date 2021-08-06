import React, { useState } from "react";
import { Grid, ToggleButton, ToggleButtonGroup } from "@material-ui/core";

type AlphabeticalFilterProps = {
  onFilter: Function;
  value: string;
  orientation: "horizontal" | "vertical" | undefined;
};

const AlphabeticalFilter: React.FC<AlphabeticalFilterProps> = (props) => {
  const [currentFilter, setCurrentFilter] = useState(props.value);
  const elements = [
    "#",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "all",
  ];

  const clickHandler = (value: string) => {
    setCurrentFilter(value);
    props.onFilter(value);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ my: 1 }}
      data-testid="alphabetical-filter"
    >
      <ToggleButtonGroup value={currentFilter} orientation={props.orientation}>
        {elements.map((value) => {
          return (
            <ToggleButton
              key={value}
              value={value}
              onClick={clickHandler.bind(null, value)}
              aria-label={value}
              sx={{
                m: 1,
                borderRadius: "50%",
                borderColor: "transparent",
                textTransform: "capitalize",
                "&:hover": {
                  transition: "0.3s",
                  color: "#397BA6",
                  backgroundColor: "#998C8CFF",
                },
              }}
            >
              <span>{value}</span>
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Grid>
  );
};

export default AlphabeticalFilter;
