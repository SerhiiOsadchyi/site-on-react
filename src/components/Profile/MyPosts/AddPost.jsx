import React from 'react';
import s from './MyPosts.module.css';
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControl/FormsControl";

const maxLength30 = maxLength(30);

const AddPost = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label>New post</label>
            <div>
                <Field name={"post"} component={Textarea} type={"text"} placeholder={"Add new post"}
                       validate={[required, maxLength30]} />
            </div>
            <button type="submit">Add post</button>
        </form>
    )
}

let AddPostRedux = reduxForm({form: 'addPost'})(AddPost);

export default AddPostRedux;