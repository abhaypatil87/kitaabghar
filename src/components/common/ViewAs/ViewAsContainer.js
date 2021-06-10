import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import IconButton from "@material-ui/core/IconButton";
import BookContext from "../../../Store/book-store";
import { viewState } from "../../../utils/bookUtils";

const useStyles = makeStyles((theme) => ({
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
    <>
      <IconButton
        onClick={props.onViewAs.bind(null, viewState.MODULE)}
        aria-label={"View as grid"}
        className={viewAs === viewState.MODULE ? classes.active : classes.icon}
        color="primary"
      >
        <ViewModuleIcon />
      </IconButton>
      <IconButton
        onClick={props.onViewAs.bind(null, viewState.HEADLINE)}
        aria-label={"View as headlines"}
        className={
          viewAs === viewState.HEADLINE ? classes.active : classes.icon
        }
        color="primary"
      >
        <ViewHeadlineIcon />
      </IconButton>
      <IconButton
        onClick={props.onViewAs.bind(null, viewState.LIST)}
        aria-label={"View as list"}
        className={viewAs === viewState.LIST ? classes.active : classes.icon}
        color="primary"
      >
        <ViewListIcon />
      </IconButton>
    </>
  );
};

export default ViewAsContainer;
