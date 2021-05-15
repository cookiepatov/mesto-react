import {React, useState, useEffect, useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])
  const {isOpen, onClose, onUpdateUser} = props

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description
    })
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        id="profile-name-input"
        name="name"
        required
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_name"
        placeholder="Ваше имя"
        defaultValue={name}
        onChange={handleNameChange} />
      <span className="popup__error profile-name-input-error">Вы пропустили это поле.</span>
      <input
        id="profile-description-input"
        name="description"
        required minLength="2"
        maxLength="200"
        className="popup__input popup__input_type_data"
        placeholder="Описание"
        defaultValue={description}
        onChange={handleDescriptionChange} />
      <span className="popup__error profile-description-input-error">Вы пропустили это поле.</span>
      <button type="submit" className="popup__button">Сохранить</button>
    </PopupWithForm>)
}

export default EditProfilePopup
