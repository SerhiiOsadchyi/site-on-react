import React, {FC} from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {PropsType} from "./HeaderContainer";


const Header: FC<PropsType> = (props) => {
    debugger;
    return <header className={s.header}>
        <img src='https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png' alt='logo'/>
        <div className={s.userLogin}>
            {(props.isAuth) ?
                <div> {props.login} <button onClick={props.logout}>Logout</button></div>
                : <NavLink to={'/login'}>Login</NavLink>
            }
        </div>
    </header>
};

export default Header;