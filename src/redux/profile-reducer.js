import {profileAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const ADD_NEW_POST = 'profile-reducer/ADD-NEW-POST';
const SET_USER_PROFILE = 'profile-reducer/SET_USER_PROFILE';
const SET_STATUS = 'profile-reducer/SET_STATUS';
const NEW_AVATAR_SAVED_SACCESS = 'profile-reducer/NEW_AVATAR_SAVED_SACCESS';
const NEW_PROFILE_DATA_SAVED_SACCESS = 'profile-reducer/NEW_PROFILE_DATA_SAVED_SACCESS';

const initialState = {
    posts: [
        {id: 0, message: 'Hello, chuvak!'},
        {id: 1, message: 'How are you?'},
        {id: 2, message: 'I\'m fine!'}
    ],
    profile: null,
    status: '---'
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 3, message: action.post}]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case NEW_AVATAR_SAVED_SACCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photo}

            };
        default:
            return state;
    }
}

export const addNewPostCreator = (post) => ({type: ADD_NEW_POST, post});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setSUserStatus = (status) => ({type: SET_STATUS, status});
export const updateUserStatusCreator = (status) => ({type: SET_STATUS, status});
export const newAvatarSavedSaccess = (photo) => ({type: NEW_AVATAR_SAVED_SACCESS, photo});

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};

export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setSUserStatus(response.data));
};

export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(updateUserStatusCreator(status));
    }
};

export const saveAvatar = (photo) => async (dispatch) => {
    //debugger
    let response = await profileAPI.saveAvatar(photo)
    if (response.data.resultCode === 0) {
        dispatch(newAvatarSavedSaccess(response.data.data.photos));
    }
};

export const saveProfileData = (profileData) => async (dispatch, getState) => {
    const userId = getState().userAuthorize.userId;
    let response = await profileAPI.saveProfile(profileData);
    //debugger
    if (response.data.resultCode === 0) {
        //debugger
        dispatch(getUserProfile(userId));
    } else if (response.data.resultCode === 1) {
        let message = response.data.messages[0].length > 0 ? response.data.messages[0] : 'Some errors';
        dispatch(stopSubmit('profileData', {_error: message}));
        return Promise.reject(response.data.messages[0]);
    }
};

export default profileReducer;