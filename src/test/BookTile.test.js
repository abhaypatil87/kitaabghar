import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import BookTile from "../components/Books/BookTile";

beforeEach(() => {
  render(
    <BookTile
      key={1}
      book_id={1}
      title={"Test book title"}
      subtitle={"Test book subtitle"}
      thumbnail_url={"url"}
      isbn_10={"isbn10"}
      isbn_13={"isbn13"}
      page_count={123}
      author={"Test Author"}
      description={"Test description"}
    />
  );
});

describe("BookTile", () => {
  it("renders BookTile component", () => {
    expect(screen.getByText(/Test book title/i)).toBeTruthy();
  });

  it("expands BookTile component", () => {
    expect(screen.getByText(/Test book title/i)).toBeTruthy();
    fireEvent.click(screen.getByText(/Test book title/i));
    expect(screen.getByText(/Test description/i)).toBeTruthy();
  });

  it("expands and collapses BookTile component", () => {
    expect(screen.getByText(/Test book title/i)).toBeTruthy();
    fireEvent.click(screen.getByText(/Test book title/i));

    expect(screen.getByText(/isbn10/i)).toBeTruthy();

    fireEvent.click(screen.getByText(/Test book title/i));
    expect(screen.queryByText(/isbn10/i)).toBeNull();
    expect(screen.getByText(/Test book title/i)).not.toBeNull();
  });
});

afterEach(cleanup);
