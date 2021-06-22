import { render, screen } from "@testing-library/react";
import App from "../App";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("BookTile", () => {
  const initialState = {
    notifications: {
      notification: null,
    },
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(initialState);
  test("renders correct number of sidebar menu items", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const sidebarMenuItems = screen.getAllByTestId("sidebar-menu-item");
    expect(sidebarMenuItems.length).toEqual(4);
  });
});
