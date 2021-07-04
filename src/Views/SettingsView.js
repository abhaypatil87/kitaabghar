import { Box, Container, makeStyles } from "@material-ui/core";
import ExportCsvDataSettingsView from "./ExportCsvDataSettingsView";
import ThirdPartyApiSettingsView from "./ThirdPartyApiSettingsView";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchThirdPartyApis } from "../Store/actions";

const useStyles = makeStyles((theme) => {
  const transition = {
    duration: theme.transitions.duration.shortest,
  };

  return {
    heading1: {
      fontSize: "24px",
      fontWeight: "500",
    },
    expandedAccordion: {
      borderTop: "2px",
      borderTopColor: "#3f51b5",
      borderTopStyle: "solid",
    },
    expandIcon: {
      transform: "rotate(0deg)",
      transition: theme.transitions.create("transform", transition),
      "&:hover": {
        backgroundColor: "lightgray",
      },
      "&$expanded": {
        transform: "rotate(90deg)",
      },
    },
    expanded: {},
  };
});
const SettingsView = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchThirdPartyApis());
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <Box>
        <ExportCsvDataSettingsView styles={classes} />
      </Box>
      <Box marginTop={1}>
        <ThirdPartyApiSettingsView styles={classes} />
      </Box>
    </Container>
  );
};

export default SettingsView;
