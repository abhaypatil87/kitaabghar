import { OKAY, SERVER_PORT, SERVER_URL } from "../../utils/crud";
import { authorsActions } from "../store";

export const fetchAuthors = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `http://${SERVER_URL}:${SERVER_PORT}/api/authors`
      );
      return await response.json();
    };

    try {
      const response = await fetchData();
      if (response.status === OKAY) {
        dispatch(authorsActions.initiate(response));
      } else {
        // dispatch error
      }
    } catch (error) {
      //dispatch error
    }
  };
};

export const editAuthor = (author) => {
  return async (dispatch) => {
    const updateData = async () => {
      const response = await fetch(
        `http://${SERVER_URL}:${SERVER_PORT}/api/authors/${author.author_id}`,
        {
          method: "PUT",
          body: JSON.stringify(author),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await response.json();
    };

    try {
      const response = await updateData();
      if (response.status === OKAY) {
        dispatch(authorsActions.edit(response));
      } else {
        // dispatch error
      }
    } catch (error) {
      //dispatch error
    }
  };
};
