import {usersAPI} from "../API/api";
import {updateObjectArrayOverlap} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_NEW_USER = 'users-reducer/ADD-NEW-USER';
const FOLLOW = 'users-reducer/FOLLOW';
const UNFOLLOW = 'users-reducer/UNFOLLOW';
const CURRENT_PAGE_CHANGED = 'users-reducer/CURRENT_PAGE_CHANGED';
const IS_FETCHED = 'users-reducer/IS_FETCHED';
const FOLLOW_IN_PROGRESS = 'users-reducer/FOLLOW_IN_PROGRESS';

const initialState = {
    users: [] as Array<UserType>,
    totalCount: 0,
    pageSize: 8,
    currentPage: 1,
    isFetched: false,
    followInProgressStatus: [] as Array<number> // Array of users id
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_NEW_USER:
            return {
                ...state,
                users: action.users,
                totalCount: action.totalCount,
                pageSize: 50
            };
        case FOLLOW:
            return {
                ...state,
                users: updateObjectArrayOverlap( state.users, action.userId,'id',{followed: true} )

            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectArrayOverlap( state.users, action.userId, 'id',{followed: false} )
            };
        case CURRENT_PAGE_CHANGED:
            return {
                ...state,
                currentPage: action.page
            };
        case IS_FETCHED:
            return {
                ...state,
                isFetched: action.isFetched
            };
        case FOLLOW_IN_PROGRESS:
            return {
                ...state,
                followInProgressStatus: action.isFetched ?
                    [...state.followInProgressStatus, action.userId]
                    : state.followInProgressStatus.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
}

///  Actions  ///

type AcceptFollowType = {
    type: typeof FOLLOW,
    userId: number
}
export const acceptFollow = (userId: number): AcceptFollowType => ({type: FOLLOW, userId});

type AcceptUnfollowType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const acceptUnfollow = (userId: number): AcceptUnfollowType => ({type: UNFOLLOW, userId});

type AddNewUsersType = {
    type: typeof ADD_NEW_USER,
    users: Array<UserType>,
    totalCount: number
}
type AddNewUsersDataType = {
    items: Array<UserType>,
    totalCount: number
}
export const addNewUsers = (data: AddNewUsersDataType): AddNewUsersType => (
    {type: ADD_NEW_USER, users: data.items, totalCount: data.totalCount});

type OnClickCurrentPageType = {
    type: typeof CURRENT_PAGE_CHANGED,
    page: number
}
export const onClickCurrentPage = (page: number): OnClickCurrentPageType => ({type: CURRENT_PAGE_CHANGED, page});

type ToggleIsFetchedType = {
    type: typeof IS_FETCHED,
    isFetched: boolean
}
export const toggleIsFetched = (isFetched: boolean): ToggleIsFetchedType => ({type: IS_FETCHED, isFetched });

type FollowProgressingType = {
    type: typeof FOLLOW_IN_PROGRESS,
    isFetched: boolean,
    userId: number
}
export const followProgressing = (isFetched: boolean, userId: number): FollowProgressingType => ({
    type: FOLLOW_IN_PROGRESS, isFetched, userId });

type ActionsType = AcceptFollowType | AcceptUnfollowType | AddNewUsersType | OnClickCurrentPageType |
    ToggleIsFetchedType | FollowProgressingType

/// Thunks ///

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export let getUsers = (page: number, pageSize: number): ThunkType =>
    async (dispatch) => {
    dispatch(toggleIsFetched(false));
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(addNewUsers(data));
    dispatch(toggleIsFetched(true))
};

let _followUnfollowSwitch = async (dispatch: Dispatch<ActionsType>,
                                  userId: number,
                                  followCase: any,
                                  actionCreator: (userId: number) => AcceptFollowType | AcceptUnfollowType) => {
    dispatch(followProgressing(true, userId));
    let data = await followCase(userId);

    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(followProgressing(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowSwitch (dispatch, userId, usersAPI.followUser, acceptFollow);
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowSwitch (dispatch, userId, usersAPI.unfollowUser, acceptUnfollow);
}

export default usersReducer;