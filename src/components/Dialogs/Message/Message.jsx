import React from 'react';
import s from './Message.module.css';

const Message = (props) => {
    return (
        <div className={s.Message}>
            {props.message}
        </div>
    )
}

export default Message;