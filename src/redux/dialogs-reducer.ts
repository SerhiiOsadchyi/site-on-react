import {InferActionsType} from "./redux-store";

const ADD_NEW_MESSAGE = 'dialogs-reducer/ADD-NEW-MESSAGE'

type DialogType = {
    id: number,
    name: string
}
type MessageType = {
    id: number,
    message: string
}

const initialState = {
    dialogs: [
        {id: 0, name: 'John'},
        {id: 1, name: 'Smith'},
        {id: 2, name: 'Leila'},
        {id: 3, name: 'Dimych'}
    ] as Array<DialogType>,
    messages: [
        {id: 0, message: 'Hi!'},
        {id: 1, message: 'How are you?'},
        {id: 2, message: 'Yoshkin kot'},
        {id: 3, message: 'Uaaaa'},
        {id: 4, message: 'Yo'}
    ] as Array<MessageType>
}



const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id : 6, message: action.message}],
            };
        default:
            return state;
    }
}

export const actions = {
    addNewMessageCreator: (message: string) => ( { type: ADD_NEW_MESSAGE, message } as const )
}

export default dialogsReducer;

type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>