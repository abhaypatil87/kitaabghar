import React from "react";
import { render, screen } from "@testing-library/react";
import SearchBar from "../components/SearchBar/SearchBar";

describe("SearchBar", () => {
  test("renders SearchBar component", () => {
    render(<SearchBar onSearch={() => {}} />);

    /* Search the case sensitive placeholder */
    expect(screen.getByPlaceholderText(/Search Books/)).toBeInTheDocument();
    /* Search the case sensitive label/aria-label */
    expect(screen.getByLabelText(/search books/)).toBeInTheDocument();
  });
});
