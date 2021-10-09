import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `place__delete-button ${
    isOwn ? 'place__delete-button' : 'place__delete-button_hidden'
  }`;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like ${
    isLiked ? 'place__like_status_enabled' : 'place__like'
  }`;

  function handleCardClick() {
    props.onClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="place">
      <img onClick={handleCardClick} src={props.card.link} className="place__image" alt={props.card.name} />
      <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button"></button>
      <div className="place__text">
        <h2 className="place__name">{props.card.name}</h2>
        <div className="plase__likes">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
          <span className="place__like-meter">{props.card.likes.length}</span>
        </div>
      </div>  
    </li>
  );
}

export default Card;