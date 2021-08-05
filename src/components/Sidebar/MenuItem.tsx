import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, SvgIcon } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    "&:hover": {
      backgroundColor: "#DDE2FF14",
    },
    height: "56px",
    cursor: "pointer",
    paddingLeft: "32px",
  },
  activeContainer: {
    backgroundColor: "#DDE2FF14",
  },
  title: {
    fontSize: "16px",
    lineHeight: "20px",
    color: "#A4A6B3",
    marginLeft: "24px",
  },
  activeTitle: {
    color: "#DDE2FF",
  },
  activeBar: {
    height: "56px",
    width: "4px",
    backgroundColor: "#DDE2FF",
    position: "absolute",
    left: "0",
  },
});

type MenuItemProps = {
  active: boolean;
  icon: typeof SvgIcon;
  title: string;
  testid?: string;
};

const MenuItem = (props: MenuItemProps) => {
  const styles = useStyles();
  const { active, icon, title } = props;
  const Icon = icon;
  return (
    <Box
      component={"div"}
      className={`${styles.container} ${active && styles.activeContainer}`}
      sx={{ display: "flex", alignItems: "center" }}
    >
      {active && <div className={styles.activeBar} />}
      <Icon sx={{ color: active ? "#DDE2FF" : "#A4A6B3" }} />
      <span
        data-testid={props.testid}
        className={`${styles.title} ${active && styles.activeTitle}`}
      >
        {title}
      </span>
    </Box>
  );
};

export default MenuItem;
