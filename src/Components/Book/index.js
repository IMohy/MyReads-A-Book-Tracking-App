import BookShelfChanger from "../BookShelfChanger";

const Book = ({ book, changeBookShelf }) => {
  return (
    <div>
      <div key={book.id} className="book">
        <div className="book-top">
          {book.imageLinks && book.imageLinks.smallThumbnail && (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.smallThumbnail})`,
              }}
            ></div>
          )}
          <BookShelfChanger book={book} changeBookShelf={changeBookShelf} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </div>
  );
};
export default Book;
