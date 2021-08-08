import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Author } from "../components/Authors";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
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
  jest.clearAllMocks();
  enableFetchMocks();
  render(
    <Provider store={store}>
      <Author
        key={1}
        author_id={"1"}
        first_name={"Alice"}
        last_name={"Walker"}
      />
    </Provider>
  );
});

describe("Author", () => {
  it("should throw error message when entered no first name value", async () => {
    userEvent.click(screen.getByRole("button", { name: /edit/i }));

    userEvent.clear(screen.getAllByRole("textbox")[0]);
    userEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(
      await screen.findByText(/name cannot be empty/i)
    ).toBeInTheDocument();
  });

  it("should throw error message and alert when entered no first name value", async () => {
    userEvent.click(screen.getByRole("button", { name: /edit/i }));

    userEvent.clear(screen.getAllByRole("textbox")[0]);
    userEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(
      await screen.findByText(/name cannot be empty/i)
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(
      await screen.findByText(/Please address all the highlighted errors./i)
    ).toBeInTheDocument();
  });

  it("should edit the author successfully when entered correct values", async () => {
    userEvent.click(screen.getByRole("button", { name: /edit/i }));
    const validFirstName = "Patrick";
    userEvent.type(screen.getAllByRole("textbox")[0], validFirstName);

    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /edit/i }));
    });

    expect(fetch).toHaveBeenCalledWith(`${SERVER}/api/authors/1`, {
      body:
        '{"author_id":"1","first_name":"AlicePatrick","last_name":"Walker"}',
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });
  });
});
