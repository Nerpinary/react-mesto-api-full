import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSetName(e) {
    setName(e.target.value);
  }

  function handleSetLink(e) {
    setLink(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(name, link);
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name={'add'}
      title={'Новое место'}
      buttonName={'Cохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleSetName}
        value={name || ''}
        type='text'
        name='inputPlace'
        id='place-input'
        minLength='2'
        maxLength='30'
        required
        placeholder='Название'
        className='popup__input popup__input_data_place'
      />
      <span className='popup__input-error'></span>
      <input
        onChange={handleSetLink}
        value={link || ''}
        type='url'
        name='inputLink'
        id='link-input'
        required
        placeholder='Ссылка на картинку'
        className='popup__input popup__input_data_link'
      />
      <span className='popup__input-error'></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;