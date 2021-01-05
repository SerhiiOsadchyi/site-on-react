import React from 'react';
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../utils/validators/validators";
import {Input} from "../common/FormsControl/FormsControl";
import styles from './Login.module.css'

const maxLength20 = maxLength(20);

let LoginForm = ({handleSubmit, error, captchaUrl}) => {
    //debugger;
    return (
        <form onSubmit={handleSubmit} className={styles.login}>
            <label>E-mail</label>
            <div>
                <Field name={"email"} component={Input} type={"text"} placeholder={"E-mail input"}
                       validate={[required, maxLength20]}/>
            </div>
            <label>Password</label>
            <div>
                <Field name={"password"} component={Input} type={"password"} placeholder={"Password input"}
                       validate={[required, maxLength20]}/>
            </div>
            <div>
                <Field name={"remember"} component={"input"} type={"checkbox"}/> Remember me
            </div>

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && <Field name={"captcha"} component={Input} placeholder={"Enter captcha symbols"}
                      validate={[required]} /> }

            {error && <div className={styles.formControlError}>{error}</div>}


            <button type="submit">Submit</button>
        </form>
    )
};

let LoginFormRedux = reduxForm({form: 'login'})(LoginForm);

export default LoginFormRedux;
