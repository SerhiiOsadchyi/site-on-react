import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
    <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to='/profile' activeClassName={s.activeNav}>Profile</NavLink>
        </div>
        <div className={s['item']}>
            <NavLink to='/dialogs' activeClassName={s.activeNav}>Message</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/users' activeClassName={s.activeNav}>Users</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/news' activeClassName={s.activeNav}>News</NavLink>
        </div>
        <div className={s.item}>
            <a href='/music'>Music</a>
        </div>
        <div className={s.item}>
            <a href='/settings'>Settings</a>
        </div>
    </nav>
    )
};

export default Navbar;