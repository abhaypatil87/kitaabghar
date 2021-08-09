import { createSlice } from "@reduxjs/toolkit";
import { loggedInUser } from "../store";

const authorisationSlice = createSlice({
  name: "authorisationState",
  initialState: null,
  reducers: {
    signIn(state, action) {
      loggedInUser.setLoggedInUser(action.payload.data.user);
    },
    signOut(state, action) {
      loggedInUser.clear();
      document.location.href = "/sign-in";
    },
  },
});

export default authorisationSlice;
