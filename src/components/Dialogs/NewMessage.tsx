import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLength, required} from "../../utils/validators/validators";
import {Textarea} from "../common/FormsControl/FormsControl";
import {DialogsFormValueType} from "./Dialogs";

const maxLength30 = maxLength(30);

const AddMessageForm: FC<InjectedFormProps<DialogsFormValueType>> = ({handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name={"message"} component={Textarea} type={"text"} placeholder={"Enter your message"}
                       validate={[required, maxLength30]} />
            </div>
            <button type="submit">Add message</button>
        </form>
    )
};

let DialogsFormRedux = reduxForm<DialogsFormValueType>({form: 'dialogsMessage'})(AddMessageForm);

export default DialogsFormRedux;

