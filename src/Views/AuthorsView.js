import React, { useEffect, useState } from "react";

const AuthorsView = () => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    const fetchAllAuthors = async () => {
      let response = await fetch("http://localhost:4000/api/authors");
      response = await response.json();
      setAuthors(response.data.authors);
    };
    fetchAllAuthors();

    return () => {
      console.log("AuthorsView is being unmounted");
    };
  }, []);

  return (
    <React.Fragment>
      {authors.map((author) => (
        <li key={author.author_id}>
          {author.first_name} {author.last_name}
        </li>
      ))}
    </React.Fragment>
  );
};

export default AuthorsView;
