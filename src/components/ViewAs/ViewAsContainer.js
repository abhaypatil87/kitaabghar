import { Box } from "@material-ui/core";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewAsIcon from "./ViewAsIcon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 10px 10px 10px",
    display: "flex",
  },
}));

const ViewAsContainer = (props) => {
  const classes = useStyles();

  return (
    <Box component="div" className={classes.root}>
      <ViewAsIcon
        onClick={props.onClick.bind(null, "grid")}
        ariaLabel={"View as grid"}
      >
        <ViewHeadlineIcon fontSize="large" />
      </ViewAsIcon>
      <ViewAsIcon
        onClick={props.onClick.bind(null, "list")}
        ariaLabel={"View as list"}
      >
        <ViewListIcon fontSize="large" />
      </ViewAsIcon>
      <ViewAsIcon
        onClick={props.onClick.bind(null, "module")}
        ariaLabel={"View as card"}
      >
        <ViewModuleIcon fontSize="large" />
      </ViewAsIcon>
    </Box>
  );
};

export default ViewAsContainer;
