import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route, Link } from "react-router-dom";
import BookShelf from "./BookShelf.js";
import SearchBooks from "./SearchBooks.js";

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: {},
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(
        () => ({
          books: books,
        }),
        () =>
          BooksAPI.update(this.state.books[0], this.state.books[0].shelf).then(
            (shelves) => {
              this.setState(() => ({
                shelves: shelves,
              }));
            }
          )
      );
    });
  }

  updateShelves(book, shelf) {
    BooksAPI.update(book, shelf).then((shelves) => {
      this.setState(
        () => ({
          shelves: shelves,
        }),
        () =>
          BooksAPI.getAll().then((books) => {
            this.setState(() => ({
              books: books,
            }));
          })
      );
    });
  }

  beautifyShelfCategory(shelf) {
    switch (shelf) {
      case "currentlyReading":
        return "Currently Reading";
      case "wantToRead":
        return "Want to Read";
      case "read":
        return "Read";
      default:
        return "None";
    }
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              shelves={this.state.shelves}
              updateShelves={(book, shelf) => this.updateShelves(book, shelf)}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.state.shelves &&
                    Object.entries(this.state.shelves).map(([shelf, books]) => (
                      <BookShelf
                        key={shelf}
                        shelfCategory={this.beautifyShelfCategory(shelf)}
                        categoryBooks={this.state.books.filter((book) =>
                          books.includes(book.id)
                        )}
                        updateShelves={(book, shelf) =>
                          this.updateShelves(book, shelf)
                        }
                      />
                    ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
