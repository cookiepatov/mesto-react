import {React, useEffect, useContext, useRef} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const {isOpen, onClose, onUpdateAvatar} = props;
  const currentUser = useContext(CurrentUserContext);
  const linkRef = useRef('');

  useEffect(() => {
    linkRef.current = currentUser.avatar;
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
      <button type="submit" className="popup__button">Сохранить</button>
    </PopupWithForm>

  )
}


export default EditAvatarPopup;
