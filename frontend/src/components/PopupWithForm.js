export default function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
            <div className="popup__container">
            <form name={props.name} className="popup__form form" onSubmit={props.onSubmit}>
                <h3 className="popup__title">{props.title}</h3>
                {props.children}
                <button type="submit" className="popup__save-button popup__submit">{props.buttonName}</button>
            </form>
            <button onClick={props.onClose} type="button" className="popup__close-button"></button>
            </div>
        </div>
    )
}

