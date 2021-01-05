import {authMe} from "./auth-reducer";

const SET_INITIALIZED = 'app-reducer//SET_INITIALIZED';

const initialState = {
    initializedSuccess: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initializedSuccess: true
            };
        default:
            return state;
    }
}

export const setInitializedSuccess = () => ({type: SET_INITIALIZED});

export const authorizedUserSuccess = () => async (dispatch) => {
    let promise = dispatch(authMe());
    await Promise.all([promise])
    dispatch(setInitializedSuccess());
}

export default appReducer;