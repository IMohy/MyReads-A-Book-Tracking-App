const options = [
  { value: "none", title: "Move to..." },
  { value: "currentlyReading", title: "Currently Reading" },
  { value: "wantToRead", title: "Want to Read" },
  { value: "read", title: "Read" },
  { value: "none", title: "None" },
];

const BookShelfChanger = ({ changeBookShelf, book }) => {
  const shelfChange = (e) => {
    e.preventDefault();
    if (book.shelf !== e.target.value) changeBookShelf(book, e.target.value);
  };

  const currentShelf = book.shelf || "none";

  return (
    <div className="book-shelf-changer">
      <select onChange={shelfChange} value={currentShelf}>
        {options.map((option) => (
          <option
            key={option.title}
            value={option.value}
            disabled={option.title === "Move to..." && true}
          >
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};
export default BookShelfChanger;
