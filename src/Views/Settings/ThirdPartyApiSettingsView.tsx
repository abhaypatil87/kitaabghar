import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils/crud";
import { saveApiSettings } from "../../Store/actions";
import { ThirdPartyApisType } from "../../declarations";
import { RootState } from "../../Store/store";

const ThirdPartyApiSettingsView = () => {
  const dispatch = useDispatch();
  const thirdPartyApisStore = useSelector((state: RootState) => {
    return state.apiSettings.thirdPartyApis;
  });
  const [apiState, setApiState] = useState<ThirdPartyApisType>({
    google_books: false,
    open_library: false,
  });

  useEffect(() => {
    if (!isEmpty(thirdPartyApisStore)) {
      setApiState(thirdPartyApisStore);
    }
  }, [thirdPartyApisStore]);

  const saveThirdPartyApiChoices = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const newState = { ...apiState, [event.target.name]: event.target.checked };
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
                  control={
                    <Switch
                      color="primary"
                      name={"google_books"}
                      checked={apiState.google_books}
                      onChange={saveThirdPartyApiChoices}
                    />
                  }
                  label="Google Books"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      name={"open_library"}
                      checked={apiState.open_library}
                      onChange={saveThirdPartyApiChoices}
                    />
                  }
                  label="Open Library"
                  labelPlacement="start"
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
