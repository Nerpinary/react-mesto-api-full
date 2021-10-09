import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onEditAvatar(avatarRef.current.value);
  }

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      buttonName={'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type='url'
        name='inputAvatarLink'
        id='avatar-link-input'
        required
        placeholder='Ссылка на картинку'
        className='popup__input popup__input_data_avatar-link'
      />
      <span className='popup__input-error avatar-link-input-error'></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;