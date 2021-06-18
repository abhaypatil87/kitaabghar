import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import IconButton from "@material-ui/core/IconButton";
import BookContext from "../../../Store/book-store";
import { viewState } from "../../../utils/crud";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px 0px 0px 0px",
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
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      className={classes.root}
    >
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
    </Grid>
  );
};

export default ViewAsContainer;
