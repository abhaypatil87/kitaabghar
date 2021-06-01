export const prepareBookData = (state) => {
  const booksDataObject = {};
  if (state.hasOwnProperty("isbn")) {
    booksDataObject.isbn = state.isbn.value;
  } else if (
    state.hasOwnProperty("isbn_10") ||
    state.hasOwnProperty("isbn_13")
  ) {
    booksDataObject.title = state.title.value;
    booksDataObject.subtitle = state.subtitle.value;
    booksDataObject.description = state.description.value;
    booksDataObject.isbn_10 = state.isbn_10.value;
    booksDataObject.isbn_13 = state.isbn_13.value;
    booksDataObject.page_count = state.page_count.value;
    booksDataObject.author = state.author.value;
    booksDataObject.thumbnail_url = state.thumbnail_url.value;
  }

  return booksDataObject;
};

export const createBook = async (bookDataObject) => {
  return await fetch("http://localhost:4000/api/books", {
    method: "POST",
    body: JSON.stringify(bookDataObject),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
