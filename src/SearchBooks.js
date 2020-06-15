import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf.js";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class SearchBooks extends Component {
  static propTypes = {
    updateShelves: PropTypes.func.isRequired,
    shelves: PropTypes.object.isRequired,
  };

  state = {
    query: "",
    searchedBooks: [],
  };

  updateQuery = (query) => {
    query === ""
      ? this.setState(() => ({
          query: query,
          searchedBooks: [],
        }))
      : this.setState(
          () => ({
            query: query,
          }),
          () =>
            BooksAPI.search(this.state.query).then((books) => {
              books.error
                ? this.setState(() => ({
                    searchedBooks: [],
                  }))
                : this.setState(() => ({
                    searchedBooks: books,
                  }));
            })
        );
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author."
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.length > 0 ? (
              <BookShelf
                key="Search"
                shelfCategory="Search Results"
                shelves={this.props.shelves}
                categoryBooks={this.state.searchedBooks}
                updateShelves={(book, shelf) =>
                  this.props.updateShelves(book, shelf)
                }
              />
            ) : (
              <div className="bookshelf">
                <h2 className="bookshelf-title">
                  No result. Type something in search or change query
                </h2>
              </div>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
