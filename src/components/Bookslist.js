import { useState } from "react";
import Book from "./Book";
import BookForm from "./Bookform";

export default function BookList() {
  let [books, setBooks] = useState(
    localStorage.getItem("book") ? JSON.parse(localStorage.getItem("book")) : []
  );

  const saveBook = (newBook) => {
    setBooks(newBook);
    localStorage.setItem("book", JSON.stringify(newBook));
  };

  const addBook = (book) => {
    console.log(book);
    if (book.name && book.author) {
      const newBook = [book, ...books];
      saveBook(newBook);
    }
    return;
  };

  const handlEditBook = (newValue) => {
    console.log(newValue);
    if (newValue.name || newValue.author || newValue.image) {
      const updatedBook = books.map((book) =>
        book.id === newValue.id ? newValue : book
      );
      saveBook(updatedBook);
    }
    return;
  };

  const deleteBook = (id) => {
    const newBooks = books.filter((book) => book.id !== id);
    saveBook(newBooks);
  };
  return (
    <div className="booklist">
      <BookForm onSubmit={addBook}></BookForm>
      <div className="book__list">
        {books.map((book) => (
          <Book
            book={book}
            key={book.id}
            onEdit={handlEditBook}
            onDelete={deleteBook}
          ></Book>
        ))}
      </div>
    </div>
  );
}
