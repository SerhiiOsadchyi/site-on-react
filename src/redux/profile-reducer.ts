import {stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileType} from "../types/common-types";
import {profileAPI} from "../API/profile-api";

const ADD_NEW_POST = 'profile-reducer/ADD-NEW-POST';
const SET_USER_PROFILE = 'profile-reducer/SET_USER_PROFILE';
const SET_STATUS = 'profile-reducer/SET_STATUS';
const NEW_AVATAR_SAVED_SUCCESS = 'profile-reducer/NEW_AVATAR_SAVED_SUCCESS';
const NEW_PROFILE_DATA_SAVED_SUCCESS = 'profile-reducer/NEW_PROFILE_DATA_SAVED_SUCCESS';

const initialState = {
    posts: [
        {id: 0, message: 'Hello, chuvak!'},
        {id: 1, message: 'How are you?'},
        {id: 2, message: 'I\'m fine!'}
    ] as Array<PostsType>,
    profile: null as null | ProfileType,
    status: '---'
}

type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {
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
        case NEW_AVATAR_SAVED_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photo} as ProfileType

            };
        default:
            return state;
    }
}

type AddNewPostCreator = {
    type: typeof ADD_NEW_POST,
    post: PostsType
}
export const addNewPostCreator = (post: PostsType): AddNewPostCreator => ({type: ADD_NEW_POST, post});

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile});

type SetSUserStatusType = {
    type: typeof SET_STATUS,
    status: string
}
export const setSUserStatus = (status: string): SetSUserStatusType => ({type: SET_STATUS, status});

type NewAvatarSavedSuccessType = {
    type: typeof NEW_AVATAR_SAVED_SUCCESS,
    photo: PhotosType
}
export const newAvatarSavedSuccess = (photo: PhotosType): NewAvatarSavedSuccessType => ({type: NEW_AVATAR_SAVED_SUCCESS, photo});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));
};

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setSUserStatus(data));
};

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setSUserStatus(status));
    }
};

export const saveAvatar = (photo: PhotosType) => async (dispatch: any) => {
    //debugger
    let data = await profileAPI.saveAvatar(photo)
    if (data.resultCode === 0) {
        dispatch(newAvatarSavedSuccess(data.data.photos));
    }
};

export const saveProfileData = (profileData: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().userAuthorize.userId;
    let data = await profileAPI.saveProfile(profileData);
    //debugger
    if (data.resultCode === 0) {
        //debugger
        dispatch(getUserProfile(userId));
    } else if (data.resultCode === 1) {
        let message = data.messages[0].length > 0 ? data.messages[0] : 'Some errors';
        dispatch(stopSubmit('profileData', {_error: message}));
        return Promise.reject(data.messages[0]);
    }
};

export default profileReducer;