import { createSlice } from "@reduxjs/toolkit";
import { viewState } from "../../utils/crud";

const initialViewState = {
  viewMode: viewState.MODULE,
};

const viewModeSlice = createSlice({
  name: "viewModeSlice",
  initialState: initialViewState,
  reducers: {
    changeViewMode(state, action) {
      state.viewMode = action.payload;
    },
  },
});

export default viewModeSlice;
