import React, {FC} from 'react';
import s from './Message.module.css';
import {MessageType} from "../../../types/dialogs-types";

const Message: FC<MessageType> = (props) => {
    return (
        <div className={s.Message}>
            {props.message}
        </div>
    )
}

export default Message;