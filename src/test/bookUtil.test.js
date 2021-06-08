import * as React from "react";
import { createBook, deleteBook, updateBook } from "../utils/bookUtils";

beforeEach(() => {
  fetch.resetMocks();
});

const expectedBookObject = {
  book_id: 1,
  title: "1984",
  subtitle: "",
  description:
    "A PBS Great American Read Top 100 Pick With extraordinary relevance and renewed popularity, George Orwell’s 1984 takes on new life in this edition. “Orwell saw, to his credit, that the act of falsifying reality is only secondarily a way of changing perceptions. It is, above all, a way of asserting power.”—The New Yorker In 1984, London is a grim city in the totalitarian state of Oceania where Big Brother is always watching you and the Thought Police can practically read your mind. Winston Smith is a man in grave danger for the simple reason that his memory still functions. Drawn into a forbidden love affair, Winston finds the courage to join a secret revolutionary organization called The Brotherhood, dedicated to the destruction of the Party. Together with his beloved Julia, he hazards his life in a deadly match against the powers that be. Lionel Trilling said of Orwell’s masterpiece, “1984 is a profound, terrifying, and wholly fascinating book. It is a fantasy of the political future, and like any such fantasy, serves its author as a magnifying device for an examination of the present.” Though the year 1984 now exists in the past, Orwell’s novel remains an urgent call for the individual willing to speak truth to power.",
  isbn_10: "0547249640",
  isbn_13: "9780547249643",
  page_count: 648,
  thumbnail_url:
    "http://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
};
describe("bookUtil", () => {
  it("creates a book, given a book object", async () => {
    fetch.mockResponseOnce(JSON.stringify(expectedBookObject));

    const actualResponse = await createBook(expectedBookObject);
    const actualBookObject = await actualResponse.json();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://192.168.1.67:4000/api/books", {
      body: JSON.stringify(expectedBookObject),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(actualBookObject).toEqual(expectedBookObject);
  });

  it("updates a book, given a book object", async () => {
    const updatedBookObject = { ...expectedBookObject };
    updatedBookObject.thumbnail_url = "";
    fetch.mockResponseOnce(JSON.stringify(updatedBookObject));

    const actualResponse = await updateBook(updatedBookObject);
    const actualBookObject = await actualResponse.json();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `http://192.168.1.67:4000/api/books/${expectedBookObject.book_id}`,
      {
        body: JSON.stringify(updatedBookObject),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    expect(actualBookObject).toEqual(updatedBookObject);
  });

  it("deletes a book, given a book id", async () => {
    const successResponse = { success: true };
    fetch.mockResponseOnce(JSON.stringify(successResponse));

    const response = await deleteBook(expectedBookObject.book_id);
    const actualResponse = await response.json();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `http://192.168.1.67:4000/api/books/${expectedBookObject.book_id}`,
      {
        method: "DELETE",
      }
    );

    expect(actualResponse).toEqual(successResponse);
  });
});
