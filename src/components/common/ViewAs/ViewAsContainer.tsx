import React from "react";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import { styled } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/core";

import { RootState, viewModeActions } from "../../../Store/store";
import { viewState } from "../../../declarations";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
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
  const dispatch = useDispatch();
  const viewMode = useSelector((state: RootState) => state.viewMode.viewMode);

  const onViewChangeHandler = (viewMode: string) => {
    dispatch(viewModeActions.changeViewMode(viewMode));
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    onViewChangeHandler(newAlignment);
  };

  return (
    <StyledToggleButtonGroup
      size="large"
      value={viewMode}
      exclusive
      onChange={handleAlignment}
      aria-label="Set view modes"
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
