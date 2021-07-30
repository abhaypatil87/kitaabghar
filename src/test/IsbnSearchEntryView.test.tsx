import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import IsbnSearchEntryView from "../Views/AddBooks/IsbnSearchEntryView";
import { SERVER } from "../utils/crud";
import { enableFetchMocks } from "jest-fetch-mock";

beforeEach(() => {
  const initialState = {
    notifications: {
      notification: null,
    },
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(initialState);
  enableFetchMocks();
  jest.clearAllMocks();
  render(
    <Provider store={store}>
      <IsbnSearchEntryView />
    </Provider>
  );
});

describe("IsbnSearchEntryView", () => {
  it("should throw error message when entered no ISBN value", async () => {
    act(() => userEvent.click(screen.getByRole("button", { name: /add/i })));
    expect(
      await screen.findByText(/ISBN number cannot be empty/i)
    ).toBeInTheDocument();
  });

  it("should throw error message and alert when entered no ISBN value", async () => {
    act(() => userEvent.click(screen.getByRole("button", { name: /add/i })));
    expect(
      await screen.findByText(/ISBN number cannot be empty/i)
    ).toBeInTheDocument();

    act(() => userEvent.click(screen.getByRole("button", { name: /add/i })));
    expect(
      await screen.findByText(/Please address all the highlighted errors./i)
    ).toBeInTheDocument();
  });

  it("should throw error message when entered incorrect ISBN value", async () => {
    userEvent.type(screen.getByRole("textbox"), "wrong isbn");
    fireEvent.blur(screen.getByRole("textbox"));

    expect(await screen.findByText(/Invalid ISBN Number/i)).toBeInTheDocument();
  });

  it("should create a book when entered correct ISBN value", async () => {
    const validIsbnNumber = "0330258648";
    userEvent.type(screen.getByRole("textbox"), validIsbnNumber);

    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /add/i }));
    });

    expect(fetch).toHaveBeenCalledWith(`${SERVER}/api/books`, {
      body: '{"isbn":"0330258648"}',
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  });
});
