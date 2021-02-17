import React, {FC} from 'react';
import s from './Dialogs.module.css';
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import DialogsFormRedux from "./NewMessage";
import {DialogsType, DialogType, MessagesType} from "../../types/dialogs-types";

const Dialogs: FC<DialogsPropsType> = (props) => {

    let onAddMessage = (value: DialogsFormValueType) => {
        props.addMessage(value.message);
    };
    let dialogs = props.dialogs.map((dialog) => {
        return <Dialog id={dialog.id} name={dialog.name} key={dialog.id} />
    });
    let messages = props.messages.map((message) => {
            return <Message message={message.message} key={message.id} id={message.id} />
        }
    );

    return (
        <div className={s.content}>
            <div className={s.dialogs}>
                {dialogs}
            </div>
            <div className={s.messages}>
                <div>
                    {messages}
                </div>
                <div>
                    <h3>New Message</h3>
                    <DialogsFormRedux onSubmit={onAddMessage}  />
                </div>

            </div>
        </div>
    )

};

export default Dialogs;

export type DialogsFormValueType = {
    message: string
}

type DialogsOwnProps = {
    addMessage: (message: string) => void
}

type DialogsPropsType = DialogsType & MessagesType & DialogsOwnProps