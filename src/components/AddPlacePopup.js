import {React, useState, useEffect, useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const {isOpen, onClose, onAddPlace} = props;
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({name, link});
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  return (
    <PopupWithForm
      name={'card'}
      title={'Новое место'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        id="place-name-input"
        name="name"
        required
        minLength="2"
        maxLength="30"
        className="popup__input popup__input_type_name"
        placeholder="Название"
        onChange={handleNameChange} />
      <span className="popup__error place-name-input-error">Вы пропустили это поле.</span>
      <input
        id="place-link-input"
        name="data"
        required
        type="url"
        className="popup__input popup__input_type_data"
        placeholder="Ссылка на картинку"
        onChange={handleLinkChange} />
      <span className="popup__error place-link-input-error">Вы пропустили это поле.</span>
      <button type="submit" className="popup__button">Создать</button>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
