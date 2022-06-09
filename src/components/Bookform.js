import { useState } from "react";

export default function BookForm({ onSubmit, onEditState, onEdit }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const handleInputAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: Math.floor(Math.random() * 10000),
      name: name,
      author: author,
    });
    setName("");
    setAuthor("");
  };

  return (
    <form className="form">
      <h2 className="form__title">Book List</h2>
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
        Добавить
      </button>
    </form>
  );
}
