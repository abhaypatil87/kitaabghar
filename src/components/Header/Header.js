import React from "react";
import { Row } from "simple-flexbox";
import { makeStyles } from "@material-ui/styles";

import AccountPopover from "../../Views/AccountPopover";

const useStyle = makeStyles({
  container: {
    height: "40px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  separator: {
    width: "2px",
    height: "32px",
    marginRight: "32px",
    marginLeft: "32px",
    borderLeft: "1px solid #dfe0eb",
  },
  title: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "30px",
    letterSpacing: "inherit",
  },
});

const Header = (props) => {
  const classes = useStyle();
  const { ...otherProps } = props;
  return (
    <Row
      className={classes.container}
      vertical="center"
      horizontal="space-between"
      {...otherProps}
    >
      <span className={classes.title}>{props.title}</span>
      <Row vertical="center">
        <div className={classes.separator} />
        <AccountPopover />
      </Row>
    </Row>
  );
};

export default Header;
