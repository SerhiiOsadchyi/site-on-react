import {authMe} from "./auth-reducer"
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsType} from "./redux-store";
import {FormAction} from "redux-form/lib/actions";

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

const actions = {
    setInitializedSuccess: () => ({type: SET_INITIALIZED} as const)
}

export const authorizedUserSuccess = (): ThunkType => async (dispatch) => {
    let promise = dispatch(authMe());
    await Promise.all([promise])
    dispatch(actions.setInitializedSuccess());
}

export default appReducer;

type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>