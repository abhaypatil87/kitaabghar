import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import KeywordsSearchEntryView from "../Views/AddBooks/KeywordsSearchEntryView";
import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";
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
  const route = "/add-books";
  const history = createMemoryHistory();
  history.push(route);
  render(
    <Router history={history}>
      <Provider store={store}>
        <KeywordsSearchEntryView />
      </Provider>
    </Router>
  );
});

describe("KeywordsSearchCreate", () => {
  it("should throw error message when entered no keywords value", async () => {
    act(() => userEvent.click(screen.getByRole("button", { name: /search/i })));
    expect(
      await screen.findByText(/Keywords cannot be empty/i)
    ).toBeInTheDocument();
  });

  it("should throw error message and alert when entered no keywords value", async () => {
    act(() => userEvent.click(screen.getByRole("button", { name: /search/i })));
    expect(
      await screen.findByText(/Keywords cannot be empty/i)
    ).toBeInTheDocument();

    act(() => userEvent.click(screen.getByRole("button", { name: /search/i })));
    expect(
      await screen.findByText(/Please address all the highlighted errors./i)
    ).toBeInTheDocument();
  });

  it("should return a list of books, if present, when entered keywords", async () => {
    const validKeywords = "anna karenina";
    userEvent.type(screen.getByRole("textbox"), validKeywords);

    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /search/i }));
    });

    expect(fetch).toHaveBeenCalledWith(
      `${SERVER}/api/books?keywords=${validKeywords}`,
      {
        headers: {},
      }
    );
  });
});
