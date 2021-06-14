export const SERVER_URL = "192.168.1.67";
export const SERVER_PORT = 4000;

export const viewState = {
  MODULE: "module",
  LIST: "list",
  HEADLINE: "headline",
};

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
    }
  );
};

export const updateAuthor = async (authorDataObject) => {
  return await fetch(
    `http://${SERVER_URL}:${SERVER_PORT}/api/authors/${authorDataObject.author_id}`,
    {
      method: "PUT",
      body: JSON.stringify(authorDataObject),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
