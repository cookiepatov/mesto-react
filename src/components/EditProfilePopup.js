import {React, useState, useEffect, useContext, useRef} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const {isOpen, onClose, onUpdateUser, isLoading} = props

  const currentUser = useContext(CurrentUserContext);

  const [buttonText, setButtonText] = useState('Сохранить');

  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);
  const [nameClassName, setNameClassName] = useState('popup__input')
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [nameErrorMsgClassName, setNameErrorMsgClassName] = useState('popup__error')

  const [description, setDescription] = useState('');
  const [descriptionIsValid, setDescriptionIsValid] = useState(true);
  const [descriptionClassName, setDescriptionClassName] = useState('popup__input')
  const [descriptionErrorMsg, setDescriptionErrorMsg] = useState('');
  const [descriptionErrorMsgClassName, setDescriptionErrorMsgClassName] = useState('popup__error')

  const [formValidity, setFormValidity] = useState(true);

  const interval = useRef();

  useEffect(() => {
    if (isLoading) {
      const dots = ['.','..','...'];
      let i = 0
      interval.current = setInterval(()=>{
        setButtonText(`Сохранение${dots[i]}`);
        i = (i === 2) ? 0 : i + 1;
      },500)
    } else {
      clearInterval(interval.current)
      setButtonText(`Сохранить`);
    }
  },[isLoading])

  useEffect(() => {
    setName(currentUser.name||'');
    setDescription(currentUser.about||'');
    clearValidation();
  }, [currentUser, isOpen]);

  useEffect(() => {
    setFormValidity(nameIsValid && descriptionIsValid);
  }, [nameIsValid, descriptionIsValid])

  function clearValidation() {
    setNameIsValid(true);
    setNameClassName('popup__input');
    setNameErrorMsg('');
    setNameErrorMsgClassName('popup__error');

    setDescriptionIsValid(true);
    setDescriptionClassName('popup__input')
    setDescriptionErrorMsg('');
    setDescriptionErrorMsgClassName('popup__error');
  }

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description
    })
  }

  function handleNameChange({target}) {
    const {value, validity, validationMessage} = target;
    setName(value);
    handleNameValidity(validity.valid, validationMessage)
  }

  function handleDescriptionChange({target}) {
    const {value, validity, validationMessage} = target;
    setDescription(value);
    handleDescriptionValidity(validity.valid, validationMessage)
  }

  function handleNameValidity(isValid, errorText) {
    setNameIsValid(isValid);
    if (isValid) {
      setNameClassName('popup__input');
      setNameErrorMsg('');
      setNameErrorMsgClassName('popup__error');
    } else {
      setNameClassName('popup__input popup__input_type_error');
      setNameErrorMsg(errorText);
      setNameErrorMsgClassName('popup__error popup__error_visible');
    }
  }

  function handleDescriptionValidity(isValid, errorText) {
    setDescriptionIsValid(isValid);
    if (isValid) {
      setDescriptionClassName('popup__input');
      setDescriptionErrorMsg('');
      setDescriptionErrorMsgClassName('popup__error')
    } else {
      setDescriptionClassName('popup__input popup__input_type_error');
      setDescriptionErrorMsg(errorText);
      setDescriptionErrorMsgClassName('popup__error popup__error_visible')
    }
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
        className={nameClassName}
        placeholder="Ваше имя"
        value={name}
        onChange={handleNameChange} />
      <span className={nameErrorMsgClassName}>{nameErrorMsg}</span>
      <input
        id="profile-description-input"
        name="description"
        required minLength="2"
        maxLength="200"
        className={descriptionClassName}
        placeholder="Описание"
        value={description}
        onChange={handleDescriptionChange} />
      <span className={descriptionErrorMsgClassName}>{descriptionErrorMsg}</span>
      <button
        type="submit"
        className="popup__button"
        disabled={!formValidity}>
          {buttonText}
      </button>
    </PopupWithForm>)
}

export default EditProfilePopup
