import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    userAuthorize: authReducer,
    form: formReducer,
    app: appReducer
})

//type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<typeof rootReducer>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsType<T extends { [key: string]: (...arg: any) => any}> = ReturnType<PropertiesTypes<T>>;

//export type InferActionsType<T> = T extends { [key: string]: infer U } ? U : never;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


//let state: AppStateType

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

export default store;