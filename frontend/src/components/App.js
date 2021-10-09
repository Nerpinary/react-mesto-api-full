import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import auth from '../utils/auth';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(true);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const promises = [api.getInfo(), api.getInitialCards()];

    Promise.all(promises)
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cardList) => cardList.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards(() => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }

  function handleUpdateUser( data ) {
    api
      .setInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }

  function handleUpdateAvatar(avatarLink) {
    api
      .setAvatar(avatarLink)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addNewCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }

    
  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setIsTooltipOpen(false);
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  function onRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setIsRegistrationSuccessful(true);
        history.push('/sign-in');
      })
      .catch(() => setIsRegistrationSuccessful(false))
      .finally(() => setIsTooltipOpen(true));
  }
  
  const [userEmail, setUserEmail] = React.useState('');
  
  React.useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token === null) { return }
    onTokenCheck(token)
  }, []
  );

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  function onTokenCheck(token) { 
    auth.checkToken(token)
      .then(res => {
        setIsLoggedIn(res.data != null);
        setUserEmail(res.data.email);
        history.push('/');
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      })
  }

  function onLogin(email, password) {
    auth.login(email, password)
      .then(() => {
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
      })    
  }  

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false)
  } 

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} onSignOut={handleSignOut} />
        <Switch>
          <Route path='/sign-up'>
            <Register onRegister={onRegister} />
          </Route>
          <Route path='/sign-in'>
            <Login onLogin={onLogin} onTokenCheck={onTokenCheck} />
          </Route>
          <ProtectedRoute exact path="/"
            isLoggedIn={isLoggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards} />
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onEditUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onEditAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>
        <InfoTooltip isOpen={isTooltipOpen} isSuccess={isRegistrationSuccessful} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;