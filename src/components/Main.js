import {useEffect, useState} from "react";

import {api} from '../utils/api';

import Card from "./Card";

function Main(props) {
  const {onEditProfile, onAddPlace, onEditAvatar, onCardClick} = props;
  const [userName, setUserName] = useState('Жак Ив Кусто');
  const [userDescription, setUserDescription] = useState('Морской исследователь');
  const [userAvatar, setUserAvatar] = useState('#');
  const [cards, setCards] = useState([]);
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([{ name, about, _id, avatar }, cards]) => {
        setUserAvatar(avatar);
        setUserName(name);
        setUserDescription(about);
        setCards(cards)
      })
      .catch(console.log);
  }, [])
  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-button" onClick={onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }} />
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        {cards.map(item => <Card card={item} key={item._id} onCardClick={onCardClick}/>)}
      </section>
    </main>
  );
}

export default Main;
