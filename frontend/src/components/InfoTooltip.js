import React from 'react';
import success from '../images/success.svg';
import error from '../images/error.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__infotooltip">
                <div className="popup__result">
                    <img src={props.isSuccess ? success : error} alt={props.isSuccess ? 'Успешно' : 'Неудачно'} className="popup__image" />
                    <div className="popup__text">
                        <p>{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                    </div>
                </div>
                <button className="popup__close-button popup__close-tooltip-button" type="button" aria-label="Закрыть" onClick={props.onClose} ></button>
            </div>
        </div>
    )
}

export default InfoTooltip