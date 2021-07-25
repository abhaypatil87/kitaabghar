import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils/crud";
import { saveApiSettings } from "../../Store/actions";

const ThirdPartyApiSettingsView = (props) => {
  const dispatch = useDispatch();
  const thirdPartyApisStore = useSelector((state) => {
    return state.apiSettings.thirdPartyApis;
  });
  const [apiState, setApiState] = useState({
    google_books: false,
    open_library: false,
  });

  useEffect(() => {
    if (!isEmpty(thirdPartyApisStore)) {
      setApiState(thirdPartyApisStore);
    }
  }, [thirdPartyApisStore]);

  const saveThirdPartyApiChoices = (name) => (event) => {
    event.preventDefault();
    const newState = { ...apiState, [name]: event.target.checked };
    dispatch(saveApiSettings(newState));
    setApiState(newState);
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ChevronRightIcon />}>
          <div>
            <Typography variant={"h1"}>Third Party APIs</Typography>
            <Typography variant={"subtitle1"}>
              Control where to search from or fetch the information about the
              books (Google Books, Open Library etc.).
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Box marginTop={1}>
            <FormControl component="fieldset">
              <FormGroup aria-label="list of APIs">
                <FormControlLabel
                  value="google_books"
                  control={<Switch color="primary" />}
                  label="Google Books"
                  labelPlacement="start"
                  checked={apiState.google_books}
                  onChange={saveThirdPartyApiChoices("google_books")}
                />
                <FormControlLabel
                  value="open_library"
                  control={<Switch color="primary" />}
                  label="Open Library"
                  labelPlacement="start"
                  checked={apiState.open_library}
                  onChange={saveThirdPartyApiChoices("open_library")}
                />
              </FormGroup>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ThirdPartyApiSettingsView;
