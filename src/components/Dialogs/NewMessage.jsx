import React from 'react';
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../utils/validators/validators";
import {Textarea} from "../common/FormsControl/FormsControl";

const maxLength30 = maxLength(30);

const NewMessage = (props) => {
    //debugger;
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"message"} component={Textarea} type={"text"} placeholder={"Enter your message"}
                       validate={[required, maxLength30]} />
            </div>
            <button type="submit">Add message</button>
        </form>

    )
};

let LoginFormRedux = reduxForm({form: 'dialogsMessage'})(NewMessage);

export default LoginFormRedux;