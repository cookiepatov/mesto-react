const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const formProfile = document.querySelector('.popup__form_type_edit-profile-info');
const formNewCard = document.querySelector('.popup__form_type_add-place');
const formAvatar = document.querySelector('.popup__form_type_change-avatar');

const elementsSelector = '.elements'
const cardTemplateSelector = '#card-template';
const popupProfileFormSelector = '.popup_type_profile'
const popupCardFormSelector = '.popup_type_card';
const popupFullViewSelector = '.popup_type_full-view';
const popupDeleteCardSelector = '.popup_type_delete-confirm';
const popupChangeAvatar = '.popup_type_avatar';

const openFormBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const changeAvatarBtn = document.querySelector('.profile__avatar-button');

const wrongImagePlaceHolderSrc = 'https://images.unsplash.com/photo-1506702315536-dd8b83e2dcf9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'

const userSelectors = {
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar-image'
}
const formConnectorData = {
  formSelectors: ['.popup__input_type_name', '.popup__input_type_data'],
  newDataKeys: ['userName', 'userInfo']
}

const avatarConnectorData = {
  formSelectors: ['.popup__input_type_data'],
  newDataKeys: ['link']
}

const apiData = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22',
  headers: {
    authorization: '175f949a-57a4-4e41-845e-76eb0a4e61c1',
    'Content-Type': 'application/json'
  }
}

export {
  validationSettings,
  formProfile,
  formNewCard,
  formAvatar,
  elementsSelector,
  cardTemplateSelector,
  popupProfileFormSelector,
  popupCardFormSelector,
  popupFullViewSelector,
  popupDeleteCardSelector,
  popupChangeAvatar,
  openFormBtn,
  addCardBtn,
  changeAvatarBtn,
  userSelectors,
  formConnectorData,
  avatarConnectorData,
  apiData,
  wrongImagePlaceHolderSrc
};
