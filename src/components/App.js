import { React, useEffect, useState } from 'react';

import Header from './Header';
import Main from './Main'
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import {api} from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      }).catch(console.log)
  }, [])

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
    setDeleteCardPopupOpen(false)
    setImagePopupOpen(false);
    setSelectedCard(null);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }
/*
  function handleDeleteCard(card) {
    setDeleteCardPopupOpen(true);
  } */

  function handleUpdateUser({ name, about }) {
    api.setUserInfo(name, about).then(user => {
      setCurrentUser(user);
      closeAllPopups();
    }).catch(console.log)
  }

  function handleUpdateAvatar(link) {
    api.setUserAvatar(link).then(user => {
      setCurrentUser(user);
      closeAllPopups();
    }).catch(console.log)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards(cards => cards
        .map(currentCard => currentCard._id === card._id ? newCard : currentCard));
        closeAllPopups();
    }).catch(console.log);
  }

  function handleDeleteCard(card) {
    api.deleteCard(card._id).then(() => {
      setCards(cards => cards
        .filter(currentCard => currentCard._id !== card._id));
    }).catch(console.log);
  }

  function handleAddCard({name, link}) {
    api.addNewCard(name, link).then(newCard => {
      setCards(cards => [newCard, ...cards]);
    }).catch(console.log);
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDeleteCard={handleDeleteCard}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCard}
        />
        <Footer />
        <EditProfilePopup onUpdateUser={handleUpdateUser} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} />
        <AddPlacePopup onAddPlace={handleAddCard} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} />
        <PopupWithForm name={'remove-card'} title={'Вы уверены?'} isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups}>
          <button type="submit" className="popup__button">Да</button>
        </PopupWithForm>
        <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} selectedCard={selectedCard} />
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
