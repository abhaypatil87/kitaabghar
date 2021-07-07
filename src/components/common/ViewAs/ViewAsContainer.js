import React from "react";
import { makeStyles } from "@material-ui/styles";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";

import { viewState } from "../../../utils/crud";
import { viewModeActions } from "../../../Store/store";

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

const ViewAsContainer = () => {
  const viewMode = useSelector((state) => state.viewMode.viewMode);
  const dispatch = useDispatch();
  const classes = useStyles();

  const onViewChangeHandler = (viewMode) => {
    dispatch(viewModeActions.changeViewMode(viewMode));
  };

  return (
    <>
      <IconButton
        onClick={onViewChangeHandler.bind(null, viewState.MODULE)}
        aria-label={"View as grid"}
        className={
          viewMode === viewState.MODULE ? classes.active : classes.icon
        }
        color="primary"
      >
        <ViewModuleIcon />
      </IconButton>
      <IconButton
        onClick={onViewChangeHandler.bind(null, viewState.HEADLINE)}
        aria-label={"View as headlines"}
        className={
          viewMode === viewState.HEADLINE ? classes.active : classes.icon
        }
        color="primary"
      >
        <ViewHeadlineIcon />
      </IconButton>
      <IconButton
        onClick={onViewChangeHandler.bind(null, viewState.LIST)}
        aria-label={"View as list"}
        className={viewMode === viewState.LIST ? classes.active : classes.icon}
        color="primary"
      >
        <ViewListIcon />
      </IconButton>
    </>
  );
};

export default ViewAsContainer;
