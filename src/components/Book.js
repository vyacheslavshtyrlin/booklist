import { useState } from "react";

export default function Book({ book, onDelete, onEditState, onEdit }) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(book.name);
  const [author, setAuthor] = useState(book.author);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({
      id: book.id,
      name: name,
      author: author,
    });
    setIsEdit(false);
  };

  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const handleInputAuthor = (e) => {
    setAuthor(e.target.value);
  };

  return (
    <div className="book">
      {isEdit ? (
        <form className="form">
           <button className="button__close" onClick={() => setIsEdit(false)}></button>
          <h2 className="form__title">Редактировать</h2>
          <input
            className="form__input"
            placeholder="Введите название"
            onChange={handleInputName}
            value={name}
          ></input>
          <input
            className="form__input"
            placeholder="Введите автора"
            onChange={handleInputAuthor}
            value={author}
          ></input>
          <button className="form__button-submit" onClick={handleSubmit}>
            Сохранить
          </button>
        </form>
      ) : (
        <div className="book__container">
          <h3 className="book__name">{book.name}</h3>
          <p className="book__author">{book.author}</p>
          <div className="button__container">
            <button
              className="button__delete"
              onClick={() => onDelete(book.id)}
            ></button>
            <button
              className="button__edit"
              onClick={() => setIsEdit((prev) => !prev)}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
}
