import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSetName(e) {
    setName(e.target.value);
  }

  function handleSetDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onEditUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={'edit'}
      title={'Редактировать профиль'}
      buttonName={'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleSetName}
        value={name || ''}
        type='text'
        name='inputName'
        id='name-input'
        required
        minLength='2'
        maxLength='40'
        placeholder='Имя'
        className='popup__input'
      />
      <span className='popup__input-error name-input-error'></span>
      <input
        onChange={handleSetDescription}
        value={description || ''}
        type='text'
        name='inputJob'
        id='job-input'
        required
        minLength='2'
        maxLength='200'
        placeholder='Вид деятельности'
        className='popup__input'
      />
      <span className='popup__input-error job-input-error'></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;