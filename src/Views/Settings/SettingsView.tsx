import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { Box, Container, createTheme, ThemeProvider } from "@material-ui/core";
import { Helmet } from "react-helmet";
import ExportCsvDataSettingsView from "./ExportCsvDataSettingsView";
import ThirdPartyApiSettingsView from "./ThirdPartyApiSettingsView";
import { fetchThirdPartyApis } from "../../Store/actions";

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

const SettingsView: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchThirdPartyApis());
  }, [dispatch]);

  const renderHelmet = () => {
    return (
      <Helmet>
        <title>{`Settings | Kitaabghar`}</title>
        <meta name="description" content={`Manage Library settings`} />
      </Helmet>
    );
  };

  return (
    <Container maxWidth="lg">
      {renderHelmet()}
      <ThemeProvider theme={theme}>
        <Box>
          <ExportCsvDataSettingsView />
        </Box>
        <Box sx={{ mt: 1 }}>
          <ThirdPartyApiSettingsView />
        </Box>
      </ThemeProvider>
    </Container>
  );
};

export default SettingsView;
