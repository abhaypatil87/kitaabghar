import React from "react";
import { Row } from "simple-flexbox";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  title: {
    fontFamily: "Roboto Thin, serif",
    fontSize: "20px",
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: "24px",
    letterSpacing: "inherit",
    color: "#a4a6b3",
    opacity: "0.7",
  },
});

const Logo = () => {
  const classes = useStyle();

  return (
    <Row horizontal="center" vertical="center">
      <span className={classes.title}>My Library</span>
    </Row>
  );
};

export default Logo;
