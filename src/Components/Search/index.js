import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../../utils/BooksAPI";
import Book from "../Book";
import FetingSpinner from "../FetchingSpinner";

const Search = () => {
  const [books, setBooks] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const onSearch = async (e) => {
    const searchValue = e.target.value;
    if (!searchValue || searchValue.trim() === "") {
      setBooks([]);
      return;
    }
    const searchedBooks = await BooksAPI.search(searchValue.trim());
    if (searchedBooks.error) {
      setBooks([]);
      return;
    }
    setIsFetching(true);
    const booksOnShelves = await BooksAPI.getAll();
    const books = searchedBooks.map((book) => {
      const match = booksOnShelves.find(
        (bookOnShelf) => bookOnShelf.id === book.id
      );
      const shelf = !match || !match.shelf ? "none" : match.shelf;
      const updatedBook = { ...book, shelf: shelf };
      return updatedBook;
    });
    setBooks(books);
    setIsFetching(false);
  };

  const changeBookShelf = async (book, shelf) => {
    const booksShelves = await BooksAPI.update(book, shelf);
    const updatedBook = books.map((book) => {
      let newShelf = "none";
      for (let key in booksShelves) {
        if (
          booksShelves.hasOwnProperty(key) &&
          Array.isArray(booksShelves[key]) &&
          booksShelves[key].find((id) => id === book.id)
        ) {
          newShelf = key;
          break;
        }
      }

      return {
        ...book,
        shelf: newShelf,
      };
    });

    setBooks(updatedBook);
  };
  console.log(books.length);
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={onSearch}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>

      <div className="search-books-results">
        {isFetching ? (
          <div className="Fetching">
            <FetingSpinner />
            <h1>Please Wait we are getting your books</h1>
          </div>
        ) : (
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} changeBookShelf={changeBookShelf} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};
export default Search;
