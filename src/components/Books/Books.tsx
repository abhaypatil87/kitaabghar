import React from "react";
import { useSelector } from "react-redux";

import BookTile from "./BookTile";
import { BookType } from "../../declarations";
import { RootState } from "../../Store/store";

interface BooksProps {
  books: Array<BookType>;
}
const Books: React.FC<BooksProps> = (props) => {
  const viewMode = useSelector((state: RootState) => state.viewMode.viewMode);

  return (
    <>
      {props.books.map((book: BookType) => (
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
          viewMode={viewMode}
        />
      ))}
    </>
  );
};

export default Books;
