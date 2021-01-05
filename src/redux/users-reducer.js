import {usersAPI} from "../API/api";
import {updateObjectArrayOverlap} from "../utils/object-helpers";

const ADD_NEW_USER = 'users-reducer/ADD-NEW-USER';
const FOLLOW = 'users-reducer/FOLLOW';
const UNFOLLOW = 'users-reducer/UNFOLLOW';
const CURRENT_PAGE_CHANGED = 'users-reducer/CURRENT_PAGE_CHANGED';
const IS_FETCHED = 'users-reducer/IS_FETCHED';
const FOLLOW_IN_PROGRESS = 'users-reducer/FOLLOW_IN_PROGRESS';

const initialState = {
    users: [],
    totalCount: 0,
    pageSize: 8,
    currentPage: 1,
    isFetched: false,
    followInProgressStatus: []
}

const usersReducer = (state = initialState, action) => {
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
                    : [state.followInProgressStatus.filter(id => id !== action.userId)]
            };
        default:
            return state;
    }
}

export const acceptFollow = (userId) => ({type: FOLLOW, userId});
export const acceptUnfollow = (userId) => ({type: UNFOLLOW, userId});
export const addNewUsers = (data) => ({type: ADD_NEW_USER, users: data.items, totalCount: data.totalCount});
export const onClickCurrentPage = (page) => ({type: CURRENT_PAGE_CHANGED, page});
export const toggleIsFetched = (isFetched) => ({type: IS_FETCHED, isFetched: isFetched});
export const followProgressing = (isFetched, userId) => ({
    type: FOLLOW_IN_PROGRESS,
    isFetched: isFetched,
    userId: userId
});

export let getUsers = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetched(false));
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(addNewUsers(data));
    dispatch(toggleIsFetched(true))
};

let followUnfollowSwitch = async (dispatch, userId, followCase, actionCreator) => {
    dispatch(followProgressing(true, userId));
    let data = await followCase(userId);

    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(followProgressing(false, userId));
}

export let follow = (userId) => async (dispatch) => {
    followUnfollowSwitch (dispatch, userId, usersAPI.followUser, acceptFollow);
}

export let unfollow = (userId) => async (dispatch) => {
    followUnfollowSwitch (dispatch, userId, usersAPI.unfollowUser, acceptUnfollow);
}

export default usersReducer;