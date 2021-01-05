import React from 'react';
import LoginFormRedux from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";

const Login = (props) => {

    let logData = (values) => {
        let { email, password, rememberMe, captcha } = values;
        props.login(email, password, rememberMe, captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

     return (
            <div>
                <h1> Login </h1>
                <LoginFormRedux onSubmit={logData} captchaUrl={props.captchaUrl} />
            </div>
        )
}

const mapStateToProps = (state) => ({
    isAuth: state.userAuthorize.isAuth,
    captchaUrl: state.userAuthorize.captchaUrl
});

export default connect( mapStateToProps, {login} )(Login);