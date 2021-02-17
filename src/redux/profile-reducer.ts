import {stopSubmit} from "redux-form";
import {PostsType} from "../types/common-types";
import {profileAPI} from "../API/profile-api";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {FormAction} from "redux-form/lib/actions";
import {PhotosType, ProfileType} from "../types/profile-types";

const ADD_NEW_POST = 'profile-reducer/ADD-NEW-POST';
const SET_USER_PROFILE = 'profile-reducer/SET_USER_PROFILE';
const SET_STATUS = 'profile-reducer/SET_STATUS';
const NEW_AVATAR_SAVED_SUCCESS = 'profile-reducer/NEW_AVATAR_SAVED_SUCCESS';

const initialState = {
    posts: [
        {id: 0, message: 'Hello, chuvak!'},
        {id: 1, message: 'How are you?'},
        {id: 2, message: 'I\'m fine!'}
    ] as Array<PostsType>,
    profile: null as null | ProfileType,
    status: '---'
}

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
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

export const actions = {
    addNewPostCreator: (post: string) => ({type: ADD_NEW_POST, post} as const),
    setUserProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
    setSUserStatus: (status: string) => ({type: SET_STATUS, status} as const),
    newAvatarSavedSuccess: (photo: PhotosType) => ({type: NEW_AVATAR_SAVED_SUCCESS, photo} as const),
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
};

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setSUserStatus(data));
};

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setSUserStatus(status));
    }
};

export const saveAvatar = (photo: File): ThunkType => async (dispatch) => {
    //debugger
    let data = await profileAPI.saveAvatar(photo)
    if (data.resultCode === 0) {
        dispatch(actions.newAvatarSavedSuccess(data.data.photos));
    }
};

export const saveProfileData = (profileData: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().userAuthorize.userId;
    let data = await profileAPI.saveProfile(profileData);
    //debugger
    if (data.resultCode === 0) {
        //debugger
        if(userId != null){
            dispatch(getUserProfile(userId))
        }
        throw new Error('Error - userId null')
    } else if (data.resultCode === 1) {
        let message = data.messages[0].length > 0 ? data.messages[0] : 'Some errors';
        dispatch(stopSubmit('profileData', {_error: message}));
        return Promise.reject(data.messages[0]);
    }
};

export default profileReducer;

type initialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>