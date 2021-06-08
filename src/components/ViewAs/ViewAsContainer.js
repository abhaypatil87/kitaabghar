import { Box } from "@material-ui/core";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewAsIcon from "./ViewAsIcon";
import { makeStyles } from "@material-ui/core/styles";
import BookContext from "../../Store/book-store";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 10px 10px 10px",
    display: "flex",
  },
}));

const ViewAsContainer = () => {
  const [viewAsState, setViewAsState] = useState("grid");
  const classes = useStyles();

  const viewAsChangeHandler = (event) => {
    setViewAsState(event);
  };
  return (
    <BookContext.Provider
      value={{ viewAs: viewAsState, setViewAs: setViewAsState }}
    >
      <Box component="div" className={classes.root}>
        <ViewAsIcon onClick={viewAsChangeHandler.bind(null, "grid")}>
          <ViewHeadlineIcon fontSize="large" />
        </ViewAsIcon>
        <ViewAsIcon onClick={viewAsChangeHandler.bind(null, "list")}>
          <ViewListIcon fontSize="large" />
        </ViewAsIcon>
        <ViewAsIcon onClick={viewAsChangeHandler.bind(null, "module")}>
          <ViewModuleIcon fontSize="large" />
        </ViewAsIcon>
      </Box>
    </BookContext.Provider>
  );
};

export default ViewAsContainer;
