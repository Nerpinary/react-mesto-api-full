import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';


function Header(props) {   

    return (
        <header className="header">
            <Link className="header__logo" to="/"></Link>
            <div className="header__menu">
                <Switch>
                    <Route path="/sign-up"><Link className="header__item" to="/sign-in">Вход</Link></Route>
                    <Route path="/sign-in"><Link className="header__item" to="/sign-up">Регистрация</Link></Route>
                    <Route exact path="/">
                        <p className="header__email">{props.userEmail}</p>
                        <button className="header__item" onClick={props.onSignOut}>Выйти</button>
                    </Route>
                </Switch>
            </div>
        </header>
    )
}

export default Header;