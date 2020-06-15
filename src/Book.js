import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  constructor(props) {
    super(props);

    let shelf = props.book.shelf
      ? props.book.shelf
      : props.shelves.currentlyReading.includes(props.book.id)
      ? "currentlyReading"
      : props.shelves.wantToRead.includes(props.book.id)
      ? "wantToRead"
      : props.shelves.read.includes(props.book.id)
      ? "read"
      : "none";

    this.state = {
      category: shelf,
    };
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.object,
  };

  handleChange = (shelfValue) => {
    this.setState(
      () => ({
        category: shelfValue,
      }),
      () => this.props.updateShelves(this.props.book, this.state.category)
    );
  };

  render() {
    return (
      <li key={this.props.book.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  this.props.book.imageLinks.smallThumbnail
                })`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                onChange={(e) => this.handleChange(e.target.value)}
                value={this.state.category ? this.state.category : "none"}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">
            {this.props.book.authors &&
              this.props.book.authors.map((author) => <p>{author}</p>)}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
