import React from 'react';
import LoginFormRedux from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {

    let logData = (values: LoginFormValuesType) => {
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

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.userAuthorize.isAuth,
    captchaUrl: state.userAuthorize.captchaUrl
});

export default connect( mapStateToProps, {login} )(Login);

export type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}
type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}