import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders correct number of sidebar menu items", () => {
  render(<App />);
  const sidebarMenuItems = screen.getAllByTestId("sidebar-menu-item");
  expect(sidebarMenuItems.length).toEqual(4);
});
