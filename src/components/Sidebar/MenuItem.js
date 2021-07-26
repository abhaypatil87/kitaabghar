import React from "react";
import { Row } from "simple-flexbox";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  activeBar: {
    height: "56px",
    width: "3px",
    backgroundColor: "#dde2ff",
    position: "absolute",
    left: "0",
  },

  activeContainer: {
    backgroundColor: "#DDE2FF14",
  },

  activeTitle: {
    color: "#dde2ff",
  },

  container: {
    "&:hover": {
      backgroundColor: "#DDE2FF14",
    },
    height: "56px",
    cursor: "pointer",
    paddingLeft: "32px",
    paddingRight: "32px",
  },

  title: {
    fontSize: "16px",
    lineHeight: "20px",
    letterSpacing: "inherit",
    color: "#a4a6b3",
    marginLeft: "24px",
  },
});

const MenuItem = (props) => {
  const styles = useStyles();
  const { active, icon, title, ...otherProps } = props;
  const Icon = icon;
  return (
    <Row
      className={`${styles.container} ${active && styles.activeContainer}`}
      vertical="center"
      {...otherProps}
    >
      {active && <div className={styles.activeBar} />}
      <Icon />
      <span
        data-testid={props.testid}
        className={`${styles.title} ${active && styles.activeTitle}`}
      >
        {title}
      </span>
    </Row>
  );
};

export default MenuItem;
