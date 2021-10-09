import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
        
            <section className="profile">
            <div className="profile__description">
                <div className="profile__avatar-box">
                <button onClick={onEditAvatar} className="profile__avatar-edit-button"><img src={currentUser.avatar} className="profile__avatar" alt="Аватар" /></button>
                </div>
                <div className="profile__info">
                <div className="profile__name-button">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button onClick={onEditProfile} className="profile__edit-button" type="button"></button>
                </div>
                <p className="profile__job">{currentUser.about}</p>
                </div>
            </div>
            <button onClick={onAddPlace} className="profile__add-button" type="button"></button>
            </section>

            <section className="places">
            <ul className="places__list">
            {cards.map((item) => (
                <Card 
                    key={item._id} 
                    card={item} 
                    onClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete} />
            ))}
            </ul>
            </section>  

        </main>
    )
}
