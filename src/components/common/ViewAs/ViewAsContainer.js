import { useContext } from "react";
import { Box } from "@material-ui/core";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewAsIcon from "./ViewAsIcon";
import { makeStyles } from "@material-ui/core/styles";
import BookContext from "../../../Store/book-store";
import { viewState } from "../../../utils/bookUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 10px 10px 10px",
    display: "flex",
  },

  active: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  icon: {
    color: "rgba(0, 0, 0, 0.26)",
    "&:hover": {
      color: "#2158d0",
    },
  },
}));

const ViewAsContainer = (props) => {
  const { viewAs } = useContext(BookContext);
  const classes = useStyles();

  return (
    <Box component="div" className={classes.root}>
      <ViewAsIcon
        onClick={props.onClick.bind(null, viewState.HEADLINE)}
        ariaLabel={"View as grid"}
      >
        <ViewHeadlineIcon
          fontSize="large"
          className={
            viewAs === viewState.HEADLINE ? classes.active : classes.icon
          }
        />
      </ViewAsIcon>
      <ViewAsIcon
        onClick={props.onClick.bind(null, viewState.LIST)}
        ariaLabel={"View as list"}
      >
        <ViewListIcon
          fontSize="large"
          className={viewAs === viewState.LIST ? classes.active : classes.icon}
        />
      </ViewAsIcon>
      <ViewAsIcon
        onClick={props.onClick.bind(null, viewState.MODULE)}
        ariaLabel={"View as card"}
      >
        <ViewModuleIcon
          fontSize="large"
          className={
            viewAs === viewState.MODULE ? classes.active : classes.icon
          }
        />
      </ViewAsIcon>
    </Box>
  );
};

export default ViewAsContainer;
