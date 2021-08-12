import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import BookDescription from "../components/Books/BookDescription";
import { viewState } from "../declarations";

const lengthyDescription =
  "How do computers and robots change the meaning of being human? " +
  "How do we deal with the epidemic of fake news? Are nations and religions still relevant? " +
  "What should we teach our children? As technology advances faster than our understanding of it, " +
  "hacking becomes a tactic of war, and the world feels more polarised than ever, " +
  "Yuval Harari addresses the challenge of navigating life in the face of constant and disorienting change " +
  "and raises the important questions we need to ask ourselves in order to survive." +
  "How can we retain freedom of choice when Big Data is watching us? What will the future workforce look like," +
  "and how should we ready ourselves for it? How should we deal with the threat of terrorism? Why is liberal democracy in crisis?" +
  "Harari invites us to consider values, meaning, and personal engagement in a world full of noise and uncertainty." +
  "When we are deluged with irrelevant information, clarity is power";

const shortDescription = "Short description";

const beforeEachCall = (description: string) => {
  const initialStore = {
    viewMode: {
      viewMode: viewState.HEADLINE,
    },
    notifications: {
      notification: null,
    },
    books: {
      books: [],
    },
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(initialStore);
  const route = "/books";
  const history = createMemoryHistory();
  history.push(route);

  render(
    <Router history={history}>
      <Provider store={store}>
        <BookDescription description={description} />
      </Provider>
    </Router>
  );
};

describe("BookDescription", () => {
  it("renders BookDescription component with full description", async () => {
    beforeEachCall(shortDescription);
    expect(screen.queryByText(/...view more/i)).toBeNull();
  });

  it("renders BookDescription component", () => {
    beforeEachCall(lengthyDescription);
    expect(screen.getByText(/...view more/i)).toBeTruthy();
  });

  it("expands description on click", () => {
    beforeEachCall(lengthyDescription);
    expect(screen.getByText(/...view more/i)).toBeTruthy();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText(/...view less/i)).toBeTruthy();
  });

  it("expands description on keyPress", () => {
    beforeEachCall(lengthyDescription);
    expect(screen.getByText(/...view more/i)).toBeTruthy();
    fireEvent.keyPress(screen.getByText(/...view more/i), {
      key: "Enter",
      code: 13,
      charCode: 13,
    });
    expect(screen.getByText(/...view less/i)).toBeTruthy();
  });

  it("expands and collapses description on keyPress", () => {
    beforeEachCall(lengthyDescription);
    expect(screen.getByText(/...view more/i)).toBeTruthy();
    fireEvent.keyPress(screen.getByRole("button"), {
      key: "Enter",
      code: 13,
      charCode: 13,
    });
    expect(screen.getByText(/...view less/i)).toBeTruthy();

    fireEvent.keyPress(screen.getByRole("button"), {
      key: "Enter",
      code: 13,
      charCode: 13,
    });
    expect(screen.queryByText(/...view less/i)).toBeNull();
    expect(screen.getByText(/...view more/i)).not.toBeNull();
  });

  it("expands and collapses description on click", () => {
    beforeEachCall(lengthyDescription);
    expect(screen.getByText(/...view more/i)).toBeTruthy();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText(/...view less/i)).toBeTruthy();

    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByText(/...view less/i)).toBeNull();
    expect(screen.getByText(/...view more/i)).not.toBeNull();
  });
});

afterEach(cleanup);
