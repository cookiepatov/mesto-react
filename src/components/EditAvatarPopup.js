import {React, useEffect, useContext, useRef, useState} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const {isOpen, onClose, onUpdateAvatar, isLoading} = props;
  const currentUser = useContext(CurrentUserContext);
  const linkRef = useRef('');
  const interval = useRef();

  const [buttonText, setButtonText] = useState('Сохранить');

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
    linkRef.current = currentUser.avatar||'';
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(linkRef.current);
  }

  function handleLinkChange(e) {
    linkRef.current = e.target.value;
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
        className="popup__input popup__input_type_data"
        placeholder="Ссылка на аватар"
        defaultValue={linkRef.current}
        onChange={handleLinkChange}/>
      <span className="popup__error avatar-link-input-error">Вы пропустили это поле.</span>
      <button type="submit" className="popup__button">{buttonText}</button>
    </PopupWithForm>

  )
}


export default EditAvatarPopup;
