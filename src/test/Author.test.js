import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Author } from "../components/Authors";
import { act } from "react-dom/test-utils";

beforeEach(() => {
  fetch.resetMocks();
  jest.clearAllMocks();
  render(
    <Author key={1} author_id={1} first_name={"Alice"} last_name={"Walker"} />
  );
});

describe("Author", () => {
  it("should throw error message when entered no first name value", async () => {
    userEvent.click(screen.getByRole("button", { name: /edit/i }));

    userEvent.clear(screen.getAllByRole("textbox")[0]);
    userEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(
      await screen.findByText(/Author name cannot be empty/i)
    ).toBeInTheDocument();
  });

  it("should throw error message and alert when entered no first name value", async () => {
    userEvent.click(screen.getByRole("button", { name: /edit/i }));

    userEvent.clear(screen.getAllByRole("textbox")[0]);
    userEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(
      await screen.findByText(/Author name cannot be empty/i)
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(
      await screen.findByText(/Please address all the highlighted errors./i)
    ).toBeInTheDocument();
  });

  it("should create edit the author successfully when entered correct values", async () => {
    userEvent.click(screen.getByRole("button", { name: /edit/i }));
    const validFirstName = "Patrick";
    userEvent.type(screen.getAllByRole("textbox")[0], validFirstName);

    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /edit/i }));
    });

    expect(fetch).toHaveBeenCalledWith(
      "http://192.168.1.67:4000/api/authors/1",
      {
        body:
          '{"author_id":1,"first_name":"AlicePatrick","last_name":"Walker"}',
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      }
    );
  });
});
