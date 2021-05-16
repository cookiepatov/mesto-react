import {React, useState, useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const {isOpen, onClose, onAddPlace, isLoading} = props;

  const [buttonText, setButtonText] = useState('Сохранить');

  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(false);
  const [nameClassName, setNameClassName] = useState('popup__input')
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [nameErrorMsgClassName, setNameErrorMsgClassName] = useState('popup__error')

  const [link, setLink] = useState('');
  const [linkIsValid, setLinkIsValid] = useState(false);
  const [linkClassName, setLinkClassName] = useState('popup__input')
  const [linkErrorMsg, setLinkErrorMsg] = useState('');
  const [linkErrorMsgClassName, setLinkErrorMsgClassName] = useState('popup__error')

  const [formValidity, setFormValidity] = useState(false);


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
    setName('');
    setLink('');
    clearValidation();
  }, [isOpen]);

  useEffect(() => {
    setFormValidity(nameIsValid && linkIsValid)
  }, [nameIsValid, linkIsValid]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({name, link});
  }

  function handleNameChange({target}) {
    const {value, validity, validationMessage} = target;
    setName(value);
    handleNameValidity(validity.valid, validationMessage);
  }

  function handleLinkChange({target}) {
    const {value, validity, validationMessage} = target;
    setLink(value);
    handleLinkValidity(validity.valid, validationMessage);
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

  function handleLinkValidity(isValid, errorText) {
    setLinkIsValid(isValid);
    if (isValid) {
      setLinkClassName('popup__input');
      setLinkErrorMsg('');
      setLinkErrorMsgClassName('popup__error');
    } else {
      setLinkClassName('popup__input popup__input_type_error');
      setLinkErrorMsg(errorText);
      setLinkErrorMsgClassName('popup__error popup__error_visible');
    }
  }

  function clearValidation() {
    setNameIsValid(false);
    setNameClassName('popup__input');
    setNameErrorMsg('');
    setNameErrorMsgClassName('popup__error');

    setLinkIsValid(false);
    setLinkClassName('popup__input')
    setLinkErrorMsg('');
    setLinkErrorMsgClassName('popup__error');
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
        className={nameClassName}
        placeholder="Название"
        onChange={handleNameChange}
        value={name} />
      <span className={nameErrorMsgClassName}>{nameErrorMsg}</span>
      <input
        id="place-link-input"
        name="data"
        required
        type="url"
        className={linkClassName}
        placeholder="Ссылка на картинку"
        onChange={handleLinkChange}
        value={link}/>
      <span className={linkErrorMsgClassName}>{linkErrorMsg}</span>
      <button
        type="submit"
        className="popup__button"
        disabled={!formValidity}>{buttonText}</button>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
