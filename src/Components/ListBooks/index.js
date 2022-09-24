import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookShelf from "../BookShelf";
import * as BooksAPI from "../../utils/BooksAPI";
import FetingSpinner from "../FetchingSpinner";

const ListBooks = () => {
  const [books, setBooks] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const getBooks = async () => {
    const res = await BooksAPI.getAll();
    setBooks(res);
    setIsFetching(false);
  };
  useEffect(() => {
    getBooks();
  }, []);
  console.log(books);
  const bookShelves = [
    { id: "currentlyReading", title: "Currently Reading" },
    { id: "wantToRead", title: "Want to read" },
    { id: "read", title: "Read" },
  ];
  const handleChangeBookShelf = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    getBooks();
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {isFetching ? (
        <div className="Fetching">
          <FetingSpinner />
          <h1>Please Wait we are getting your books</h1>
        </div>
      ) : (
        <div className="list-books-content">
          {bookShelves.map((shelf) => (
            <BookShelf
              changeBookShelf={handleChangeBookShelf}
              key={shelf.id}
              shelfTitle={shelf.title}
              shelfID={shelf.id}
              bookShelves={bookShelves}
              books={books}
            />
          ))}
        </div>
      )}

      <div className="open-search">
        <Link to="search" />
      </div>
    </div>
  );
};
export default ListBooks;
