import { Box, Container, createTheme, ThemeProvider } from "@material-ui/core";
import ExportCsvDataSettingsView from "./ExportCsvDataSettingsView";
import ThirdPartyApiSettingsView from "./ThirdPartyApiSettingsView";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchThirdPartyApis } from "../../Store/actions";
import { Helmet } from "react-helmet";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: "24px",
          fontWeight: "bolder",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            borderTop: "2px",
            borderTopColor: "#3f51b5",
            borderTopStyle: "solid",
          },
        },
        expandIconWrapper: {
          "&.Mui-expanded": {
            transform: "rotate(90deg)",
          },
        },
      },
    },
  },
});

const SettingsView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchThirdPartyApis());
  }, [dispatch]);

  const renderHelmet = () => {
    return (
      <Helmet>
        <title>{`Settings | Home Library`}</title>
        <meta name="description" content={`Manage Library settings`} />
      </Helmet>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      {renderHelmet()}
      <Container maxWidth="md">
        <Box>
          <ExportCsvDataSettingsView />
        </Box>
        <Box sx={{ mt: 1 }}>
          <ThirdPartyApiSettingsView />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SettingsView;
