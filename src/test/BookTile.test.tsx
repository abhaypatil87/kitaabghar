import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BookTile } from "../components/Books/";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { viewState } from "../utils/crud";
import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";

beforeEach(() => {
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
        <BookTile
          key={1}
          book_id={"1"}
          title={"Test book title"}
          subtitle={"Test book subtitle"}
          thumbnail_url={"url"}
          isbn_10={"isbn10"}
          isbn_13={"isbn13"}
          page_count={123}
          author={"Test Author"}
          description={"Test description"}
          viewMode={viewState.HEADLINE}
        />
      </Provider>
    </Router>
  );
});

describe("BookTile", () => {
  it("renders BookTile component", () => {
    expect(screen.getByText(/Test book title/i)).toBeTruthy();
  });

  it("expands BookTile component on click", () => {
    expect(screen.getByText(/Test book title/i)).toBeTruthy();
    fireEvent.click(screen.getByText(/Test book title/i));
    expect(screen.getByText(/Test description/i)).toBeTruthy();
  });

  it("expands BookTile component on keyDown", () => {
    expect(screen.getByText(/Test book title/i)).toBeTruthy();
    fireEvent.keyDown(screen.getByText(/Test book title/i), {
      key: "Enter",
      keyCode: 13,
    });
    expect(screen.getByText(/Test description/i)).toBeTruthy();
  });

  it("expands and collapses BookTile component on click", () => {
    expect(screen.getByText(/Test book title/i)).toBeTruthy();
    fireEvent.click(screen.getByText(/Test book title/i));
    expect(screen.getByText(/isbn10/i)).toBeTruthy();

    fireEvent.click(screen.getByText(/Test book title/i));
    expect(screen.queryByText(/Test description/i)).toBeNull();
    expect(screen.getByText(/Test book title/i)).not.toBeNull();
  });

  it("expands and collapses BookTile component on keyDown", () => {
    expect(screen.getByText(/Test book title/i)).toBeTruthy();
    fireEvent.keyDown(screen.getByText(/Test book title/i), {
      key: "Enter",
      keyCode: 13,
    });
    expect(screen.getByText(/isbn10/i)).toBeTruthy();

    fireEvent.click(screen.getByText(/Test book title/i));
    expect(screen.queryByText(/Test description/i)).toBeNull();
    expect(screen.getByText(/Test book title/i)).not.toBeNull();
  });
});

afterEach(cleanup);
