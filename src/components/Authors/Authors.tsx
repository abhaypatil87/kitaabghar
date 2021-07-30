import { useSelector } from "react-redux";
import { AuthorType } from "../../declarations";
import Author from "./Author";
import { RootState } from "../../Store/store";

const Authors = () => {
  const authorsStore = useSelector((state: RootState) => state.authors.authors);
  return (
    <>
      {authorsStore.map((author: AuthorType) => (
        <Author
          key={author.author_id}
          author_id={author.author_id}
          first_name={author.first_name}
          last_name={author.last_name}
        />
      ))}
    </>
  );
};

export default Authors;
