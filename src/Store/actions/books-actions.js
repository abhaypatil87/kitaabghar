import { OKAY, SERVER_PORT, SERVER_URL } from "../../utils/crud";
import { booksActions } from "../store";

export const fetchBooks = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `http://${SERVER_URL}:${SERVER_PORT}/api/books`
      );
      return await response.json();
    };

    try {
      const response = await fetchData();
      if (response.status === OKAY) {
        dispatch(booksActions.initiate(response.data.books));
      } else {
        // dispatch error
      }
    } catch (error) {
      //dispatch an error
    }
  };
};
