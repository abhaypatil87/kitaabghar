import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_USER_KEY } from "../../utils/crud";

const authorisationSlice = createSlice({
  name: "authorisationState",
  initialState: null,
  reducers: {
    signIn(state, action) {
      localStorage.setItem(
        LOCAL_STORAGE_USER_KEY,
        JSON.stringify(action.payload.data.user)
      );
    },
    signOut(state, action) {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    },
  },
});

export default authorisationSlice;
