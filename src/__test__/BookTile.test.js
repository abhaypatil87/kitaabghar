import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import BookTile from "../components/Books/BookTile";

afterEach(cleanup);

describe("BookTile", () => {
  it("renders BookTile component", () => {
    const { queryByLabelText, getByLabelText } = render(
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
    expect(queryByLabelText(/Test book title/i)).toBeTruthy();

    fireEvent.click(getByLabelText(/Test book title/i));

    expect(queryByLabelText(/Test description/i)).toBeTruthy();
  });
});
