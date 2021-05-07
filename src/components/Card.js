import React from 'react';

function Card(props) {
  const {card, onCardClick, onDeleteClick} = props;
  function handleClick() {
    onCardClick(card);
  }
  function handleDelete() {
    onDeleteClick(card);
  }
  return (
    <figure className="element">
      <button className="element__picture-button" style={{backgroundImage: `url(${card.link})`}} onClick={handleClick}/>
      <button type="button" className="element__delete-button"  onClick={handleDelete}></button>
      <figcaption className="element__caption">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like-container">
          <button type="button" className="element__like-button"></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </figcaption>
    </figure>)
}

export default Card;
