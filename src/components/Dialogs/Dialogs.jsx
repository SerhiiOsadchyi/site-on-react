import React from 'react';
import s from './Dialogs.module.css';
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import LoginFormRedux from "./NewMessage";

const Dialogs = (props) => {

    let onAddMessage = (value) => {
        props.addMessage(value.message);
    };
    let dialogs = props.dialogs.map((dialog) => {
        return <Dialog id={dialog.id} name={dialog.name} key={dialog.id} />
    });
    let messages = props.messages.map((message) => {
            return <Message message={message.message} key={message.id}/>
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
                    <LoginFormRedux onSubmit={onAddMessage}  />
                </div>

            </div>
        </div>
    )

};

export default Dialogs;