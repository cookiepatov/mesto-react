import {React, useEffect, useState, useContext} from 'react';

import {api} from '../utils/api';

import Card from './Card';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
  const {onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onDeleteCard,
    cards,
    onCardLike,
    onCardDelete} = props;
  const {name: userName, about: userDescription, avatar: userAvatar, _id: userId} = useContext(CurrentUserContext)




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
        {cards.map(item => (
        <Card
          card={item}
          key={item._id}
          onCardClick={onCardClick}
          onDeleteClick={onCardDelete}
          onCardLike={onCardLike}/>))}
      </section>
    </main>
  );
}

export default Main;
