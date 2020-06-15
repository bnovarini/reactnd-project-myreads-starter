# MyReads Project

This project is part of my Udacity React course.

It creates a simple frontend in React for users to categorize their books into the following "shelves":

- Currently Reading
- Want to Read
- Read

Users can also search books to add to a shelf.
Search functionality is limited. The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend

## Getting started

To get started developing right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`

## Backend Server - API reference

This project uses a backend server provided by Udacity. The file [`BooksAPI.js`](src/BooksAPI.js) contains the methods used to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. To provide the user with which shelf a searched book is in, the results from this response are cross-referenced with our current bookshelf state.
