import React from "react";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import { styled } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { viewState } from "../../../utils/crud";
import { viewModeActions } from "../../../Store/store";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/core";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const ViewAsContainer = () => {
  const viewMode = useSelector((state) => state.viewMode.viewMode);
  const dispatch = useDispatch();

  const onViewChangeHandler = (viewMode) => {
    dispatch(viewModeActions.changeViewMode(viewMode));
  };

  const handleAlignment = (event, newAlignment) => {
    onViewChangeHandler(newAlignment);
  };

  return (
    <StyledToggleButtonGroup
      size="large"
      value={viewMode}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value={viewState.MODULE} aria-label={"View as grid"}>
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value={viewState.HEADLINE} aria-label={"View as headline"}>
        <ViewHeadlineIcon />
      </ToggleButton>
      <ToggleButton value={viewState.LIST} aria-label={"View as list"}>
        <ViewListIcon />
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
};

export default ViewAsContainer;
