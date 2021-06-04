import React from "react";
import BookTile from "./BookTile";

const Books = (props) => {
  return (
    <div>
      {props.books.map((book) => (
        <BookTile
          key={book.book_id}
          book_id={book.book_id}
          title={book.title}
          subtitle={book.subtitle}
          thumbnail_url={book.thumbnail_url}
          isbn_10={book.isbn_10}
          isbn_13={book.isbn_13}
          page_count={book.page_count}
          author={book.author}
          description={book.description}
        />
      ))}
    </div>
  );
};

export default Books;
