import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf.js";
import PropTypes from "prop-types";

class SearchBooks extends Component {
  static propTypes = {
    updateShelves: PropTypes.func.isRequired,
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
      : this.setState(() => ({
          query: query,
        }));
  };

  queryBooks = (e) => {
    e.preventDefault();
    BooksAPI.search(this.state.query).then((books) => {
      books.error
        ? this.setState(() => ({
            searchedBooks: [],
          }))
        : this.setState(() => ({
            searchedBooks: books,
          }));
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/*Tried to use <Link> here but going back to main page wasn't 
          reflecting an updated book I added to a shelf category 
          (read, want to read, currently reading). Used <a> instead*/}
          <a href="/">
            <button className="close-search">Close</button>
          </a>
          <div className="search-books-input-wrapper">
            <form onSubmit={(event) => this.queryBooks(event)}>
              <input
                type="text"
                placeholder="Search by title or author. Press enter to perform search."
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.length > 0 ? (
              <BookShelf
                key="Search"
                shelfCategory="Search Results"
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
