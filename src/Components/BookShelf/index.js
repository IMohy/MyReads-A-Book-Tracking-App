import Book from "../Book";

const BookShelf = ({ shelfID, shelfTitle, books, changeBookShelf }) => {
  return (
    <>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books
              .filter((book) => book.shelf === shelfID)
              .map((book) => (
                <li key={book.id}>
                  <Book changeBookShelf={changeBookShelf} book={book} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    </>
  );
};
export default BookShelf;
