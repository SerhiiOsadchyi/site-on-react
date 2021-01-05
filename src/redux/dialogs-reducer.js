const ADD_NEW_MESSAGE = 'dialogs-reducer/ADD-NEW-MESSAGE';

const initialState = {
    dialogs: [
        {id: 0, name: 'John'},
        {id: 1, name: 'Smith'},
        {id: 2, name: 'Leila'},
        {id: 3, name: 'Dimych'}
    ],
    messages: [
        {id: 0, message: 'Hi!'},
        {id: 1, message: 'How are you?'},
        {id: 2, message: 'Yoshkin kot'},
        {id: 3, message: 'Uaaaa'},
        {id: 4, message: 'Yo'}
    ]
}

const dialogsReducer = (state = initialState, action) => {
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

export const addNewMessageCreator = (message) => ( { type: ADD_NEW_MESSAGE, message } );

export default dialogsReducer;