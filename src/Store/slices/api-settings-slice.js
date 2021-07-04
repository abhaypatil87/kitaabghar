import { createSlice } from "@reduxjs/toolkit";

const initialApiSettingsState = {
  thirdPartyApis: {},
};

const apiSettingsSlice = createSlice({
  name: "apiSettingsState",
  initialState: initialApiSettingsState,
  reducers: {
    initiate(state, action) {
      state.thirdPartyApis = action.payload.data.thirdPartyApis;
    },
  },
});

export const apisSettingsActions = apiSettingsSlice.actions;

export default apiSettingsSlice;
