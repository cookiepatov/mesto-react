import {useState} from "react";

import Header from "./Header";
import Main from "./Main"
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePupup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard(null);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }
  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm name={'profile'} title={'Редактировать профиль'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input id="profile-name-input" name="name" required minLength="2" maxLength="40" className="popup__input popup__input_type_name" placeholder="Ваше имя" />
        <span className="popup__error profile-name-input-error">Вы пропустили это поле.</span>
        <input id="profile-description-input" name="description" required minLength="2" maxLength="200" className="popup__input popup__input_type_data" placeholder="Описание" />
        <span className="popup__error profile-description-input-error">Вы пропустили это поле.</span>
        <button type="submit" className="popup__button">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm name={'card'} title={'Новое место'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input id="place-name-input" name="name" required minLength="2" maxLength="30" className="popup__input popup__input_type_name" placeholder="Название" />
        <span className="popup__error place-name-input-error">Вы пропустили это поле.</span>
        <input id="place-link-input" name="data" required type="url" className="popup__input popup__input_type_data" placeholder="Ссылка на картинку" />
        <span className="popup__error place-link-input-error">Вы пропустили это поле.</span>
        <button type="submit" className="popup__button" disabled>Создать</button>
      </PopupWithForm>
      <PopupWithForm name={'avatar'} title={'Обновить аватар'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input id="avatar-link-input" name="data" required type="url" className="popup__input popup__input_type_data" placeholder="Ссылка на аватар" />
        <span className="popup__error avatar-link-input-error">Вы пропустили это поле.</span>
        <button type="submit" className="popup__button">Сохранить</button>
      </PopupWithForm>
      <ImagePupup isOpen={isImagePopupOpen} onClose={closeAllPopups} selectedCard={selectedCard}/>
    </div>
  );
}

export default App;
