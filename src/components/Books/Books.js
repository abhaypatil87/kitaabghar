import React from "react";
import BookTile from "./BookTile";

const Books = (props) => {
  return (
    <div>
      {props.books.map((book) => (
        <BookTile
          key={book.book_id}
          title={book.title}
          subtitle={book.subtitle}
          thumbnailUrl={book.thumbnail_url}
          isbn10={book.isbn_10}
          isbn13={book.isbn_13}
          pageCount={book.page_count}
          author={book.author}
          description={book.description}
        />
      ))}
    </div>
  );
};

export default Books;
