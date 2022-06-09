import { useState } from "react";

export default function Book({ book, onDelete, onEditState, onEdit }) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(book.name);
  const [author, setAuthor] = useState(book.author);
  const [cover, setCover] = useState({});

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setCover(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({
      id: book.id,
      name: name,
      author: author,
      image: cover,
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
          <button
            className="button__close"
            onClick={() => setIsEdit(false)}
          ></button>
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
          <span className="input__caption">Добавить обложку</span>
          <input
            type="file"
            accept={"jpg, .jpeg, .png"}
            onChange={(e) => uploadImage(e)}
          ></input>
          <button className="form__button-submit" onClick={handleSubmit}>
            Сохранить
          </button>
        </form>
      ) : (
        <div className="book__container">
          {book.image ? (
            <img src={book.image} className="book__image" alt="cover"></img>
          ) : (
            <div className="book__cover">Здесь должна быть обложка</div>
          )}

          <div className="book__description">
            <h3 className="book__info">{book.name}</h3>
            <p className="book__info">{book.author}</p>
          </div>
          <div className="button__container">
            <button
              className="button__edit"
              onClick={() => setIsEdit((prev) => !prev)}
            ></button>
            <button
              className="button__delete"
              onClick={() => onDelete(book.id)}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
}
