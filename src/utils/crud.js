export const SERVER_URL = "192.168.1.67";
export const SERVER_PORT = 4000;

export const ERROR = "error";
export const SUCCESS = "success";
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
