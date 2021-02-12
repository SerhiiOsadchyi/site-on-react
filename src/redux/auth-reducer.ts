import {stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {authAPI} from "../API/auth-api";
import {securityAPI} from "../API/security-api";
import {ResultCodeForCaptcha, ResultCodes} from "../types/type-api";
import {FormAction} from "redux-form/lib/actions";

const SET_USER_DATA = 'auth-reducer/SET_USER_DATA';
const SET_CAPTCHA_URL = 'auth-reducer/SET_CAPTCHA_URL';

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA, payload: {userId, email, login, isAuth}
    } as const),
    setCaptchaUrl: (captchaUrl: string) => ({
        type: SET_CAPTCHA_URL, payload: {captchaUrl}
    } as const)
}

export const authMe = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me();
    if (meData.resultCode === ResultCodes.Success) {
        let {id, email, login} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.captchaURL();
    let captchaUrl = response.data.url;
    dispatch(actions.setCaptchaUrl(captchaUrl));
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
    async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodes.Success) {
        dispatch(authMe());
    } else {
        if (data.resultCode === ResultCodeForCaptcha.Captcha) {
            dispatch(getCaptchaUrl());
        }
        let message = data.messages[0].length > 0 ? data.messages[0] : 'Some errors';
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === ResultCodes.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export default authReducer;

type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
