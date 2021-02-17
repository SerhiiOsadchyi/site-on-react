import React, {FC} from 'react';
import s from './Dialog.module.css';
import {NavLink} from "react-router-dom";
import {DialogType} from "../../../types/dialogs-types";

const Dialog: FC<DialogType> = (props) => {
    return (
        <div className={s.dialogs}>
            <NavLink to={'/dialogs/' + props.id}  activeClassName='activeNav'>{props.name}</NavLink>
        </div>
    )
}

export default Dialog;