import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import AlphabeticalFilter from "../components/common/AlphabeticalFilter/AlphabeticalFilter";
import { viewState } from "../declarations";

beforeEach(() => {
  const initialStore = {
    viewMode: {
      viewMode: viewState.HEADLINE,
    },
    notifications: {
      notification: null,
    },
    books: {
      books: [
        {
          book_id: 3,
          title: "21 Lessons for the 21st Century",
          subtitle: "",
          description:
            "How do computers and robots change the meaning of being human? How do we deal with the epidemic of fake news? Are nations and religions still relevant? What should we teach our children? As technology advances faster than our understanding of it, hacking becomes a tactic of war, and the world feels more polarized than ever, Yuval Harari addresses the challenge of navigating life in the face of constant and disorienting change and raises the important questions we need to ask ourselves in order to survive. How can we retain freedom of choice when Big Data is watching us? What will the future workforce look like, and how should we ready ourselves for it? How should we deal with the threat of terrorism? Why is liberal democracy in crisis? Harari invites us to consider values, meaning, and personal engagement in a world full of noise and uncertainty. When we are deluged with irrelevant information, clarity is power.",
          isbn_10: "0771048858",
          isbn_13: "9780771048852",
          page_count: 400,
          thumbnail_url:
            "http://books.google.com/books/content?id=DCBMswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          library_id: 1,
          author: "Yuval N.",
        },
      ],
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
        <AlphabeticalFilter
          onFilter={() => {}}
          value={"all"}
          orientation={"horizontal"}
        />
      </Provider>
    </Router>
  );
});

describe("Alphabetical Filter", () => {
  it("renders Alphabetical Filter component", () => {
    const sidebarMenuItems = screen.getAllByTestId("alphabetical-filter");
    expect(sidebarMenuItems.length).toEqual(1);
  });
});

afterEach(cleanup);
