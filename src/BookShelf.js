import React from "react";
import PropTypes from "prop-types";
import Book from "./Book.js";

function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfCategory}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.categoryBooks.map((book) => (
            <Book
              key={book.id}
              book={book}
              updateShelves={(book, shelf) => props.updateShelves(book, shelf)}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  shelfCategory: PropTypes.string.isRequired,
  categoryBooks: PropTypes.array.isRequired,
};

export default BookShelf;
