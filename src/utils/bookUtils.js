export const SERVER_URL = "192.168.1.67";
export const SERVER_PORT = 4000;
export const createBook = async (bookDataObject) => {
  return await fetch(`http://${SERVER_URL}:${SERVER_PORT}/api/books`, {
    method: "POST",
    body: JSON.stringify(bookDataObject),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateBook = async (bookDataObject) => {
  return await fetch(
    `http://${SERVER_URL}:${SERVER_PORT}/api/books/${bookDataObject.book_id}`,
    {
      method: "PUT",
      body: JSON.stringify(bookDataObject),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteBook = async (bookId) => {
  return await fetch(
    `http://${SERVER_URL}:${SERVER_PORT}/api/books/${bookId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
