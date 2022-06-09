import { useState } from "react";

export default function BookForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState({});
  const [warning, setWarning] = useState(false);
  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImage(base64);
    console.log(base64);
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

  const handleInputAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && author) {
      onSubmit({
        id: Math.floor(Math.random() * 10000),
        name: name,
        author: author,
        image: image ,
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
      <span className="input__caption">Добавить обложку</span>
      <input
        type="file"
        accept={"jpg, .jpeg, .png"}
        onChange={(e) => uploadImage(e)}
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
