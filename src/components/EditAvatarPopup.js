import {React, useEffect, useContext, useRef, useState} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const {isOpen, onClose, onUpdateAvatar, isLoading} = props;
  const currentUser = useContext(CurrentUserContext);
  const linkRef = useRef('');
  const interval = useRef();

  const [formValidity, setFormValidity] = useState(true);
  const [linkIsValid, setLinkIsValid] = useState(true);
  const [linkClassName, setLinkClassName] = useState('popup__input')
  const [linkErrorMsg, setLinkErrorMsg] = useState('');
  const [linkErrorMsgClassName, setLinkErrorMsgClassName] = useState('popup__error')

  const [buttonText, setButtonText] = useState('Сохранить');

  useEffect(() => {
    setFormValidity(linkIsValid);
  },[linkIsValid])

  useEffect(() => {
    clearValidation();
  },[isOpen])

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
    linkRef.current = currentUser.avatar;
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(linkRef.current);
  }

  function handleLinkChange({target}) {
    const {value, validity, validationMessage} = target;
    linkRef.current = value;
    handleLinkValidity(validity.valid, validationMessage);
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
    setLinkIsValid(true);
    setLinkClassName('popup__input')
    setLinkErrorMsg('');
    setLinkErrorMsgClassName('popup__error');
  }

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        id="avatar-link-input"
        name="data"
        required
        type="url"
        className={linkClassName}
        placeholder="Ссылка на аватар"
        defaultValue={linkRef.current}
        onChange={handleLinkChange} />
      <span className={linkErrorMsgClassName}>{linkErrorMsg}</span>
      <button
        type="submit"
        className="popup__button"
        disabled={!formValidity}>
          {buttonText}
      </button>
    </PopupWithForm>

  )
}


export default EditAvatarPopup;
