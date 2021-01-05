import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 0, message: 'Hello, chuvak!'},
                {id: 1, message: 'How are you?'},
                {id: 2, message: 'I\'m fine!'}
            ],
            textNewPost: ''
        },
        dialogsPage: {
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
            ],
            textNewMessage: ''
        }
    },
    _callSubscriber: null,

    subscribe(observe) {
        this._callSubscriber = observe;
    },
    getState() {
        return this._state;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber(this._state);
    }
}

window.state = store.getState();

export default store;