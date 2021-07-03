import { useSelector } from "react-redux";
import Author from "./Author";

const Authors = () => {
  const authorsStore = useSelector((state) => state.authors.authors);
  return (
    <>
      {authorsStore.map((author) => (
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
