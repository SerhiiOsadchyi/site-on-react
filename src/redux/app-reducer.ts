import {authMe} from "./auth-reducer"
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_INITIALIZED = 'app-reducer//SET_INITIALIZED'

type InitialStateType = {
    initializedSuccess: boolean
}

const initialState: InitialStateType = {
    initializedSuccess: false
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

type SetInitializedSuccess = {
    type: typeof SET_INITIALIZED
}
export const setInitializedSuccess = (): SetInitializedSuccess => ({type: SET_INITIALIZED});

type ActionsType = SetInitializedSuccess

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const authorizedUserSuccess = (): ThunkType => async (dispatch) => {
    let promise = dispatch(authMe());
    await Promise.all([promise])
    dispatch(setInitializedSuccess());
}

export default appReducer;