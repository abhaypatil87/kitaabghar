import { render, screen } from "@testing-library/react";
import App from "../App";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { loggedInUser } from "../Store/store";

const DUMMY_USER = "{}";

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("App", () => {
  const initialState = {
    notifications: {
      notification: null,
    },
    books: { books: [] },
    viewMode: {
      viewMode: "",
    },
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(initialState);
  test("renders correct number of sidebar menu items", () => {
    loggedInUser.setLoggedInUser(DUMMY_USER);

    render(
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );
    const sidebarMenuItems = screen.getAllByTestId("sidebar-menu-item");
    expect(sidebarMenuItems.length).toEqual(10);
  });
});
