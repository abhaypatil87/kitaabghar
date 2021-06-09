import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    "&:hover": {
      color: "#2158d0",
    },
  },
  hover: {
    cursor: "pointer",
  },
}));
const ViewAsIcon = (props) => {
  const classes = useStyles();

  return (
    <Typography
      className={`${classes.iconButton} ${classes.hover}`}
      onClick={props.onClick}
      aria-label={props.ariaLabel}
    >
      {props.children}
    </Typography>
  );
};

export default ViewAsIcon;
