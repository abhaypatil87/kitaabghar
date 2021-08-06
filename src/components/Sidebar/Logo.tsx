import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";

const useStyle = makeStyles({
  title: {
    fontFamily: "Yatra One, cursive",
    fontSize: "18px",
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: "24px",
    letterSpacing: "inherit",
    color: "inherit",
    opacity: "0.7",
  },
});

const Logo: React.FC = () => {
  const classes = useStyle();

  return (
    <Box component={"div"}>
      <span className={classes.title}>क़िताबघर / Kitaabghar</span>
    </Box>
  );
};

export default Logo;
