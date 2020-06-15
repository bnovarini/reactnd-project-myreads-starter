import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  state = {
    category: this.props.book.shelf,
  };

  static propTypes = {
    book: PropTypes.object.isRequired,
  };

  handleChange = (shelfValue) => {
    this.props.updateShelves(this.props.book, shelfValue);
    this.setState(() => ({
      category: shelfValue,
    }));
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
                value={this.props.book.shelf ? this.props.book.shelf : "none"}
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
          <div className="book-authors">{this.props.book.author}</div>
        </div>
      </li>
    );
  }
}

export default Book;
