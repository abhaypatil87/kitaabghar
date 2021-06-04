export const createBook = async (bookDataObject) => {
  return await fetch("http://localhost:4000/api/books", {
    method: "POST",
    body: JSON.stringify(bookDataObject),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateBook = async (bookDataObject) => {
  return await fetch(
    `http://localhost:4000/api/books/${bookDataObject.book_id}`,
    {
      method: "PUT",
      body: JSON.stringify(bookDataObject),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
