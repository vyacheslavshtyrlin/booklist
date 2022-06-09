import { useState } from "react";

export default function BookForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [warning, setWarning] = useState(false);
  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const handleInputAuthor = (e) => {
    setAuthor(e.target.value);
  };
  console.log(warning);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && author) {
      onSubmit({
        id: Math.floor(Math.random() * 10000),
        name: name,
        author: author,
      });
      setName("");
      setAuthor("");
      setWarning(false);
    } else {
      setWarning(true);
    }
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
      {warning ? (
        <span className="form__warning">Все поля должны быть заполнены</span>
      ) : (
        <></>
      )}
      <button className="form__button-submit" onClick={handleSubmit}>
        Добавить
      </button>
    </form>
  );
}
