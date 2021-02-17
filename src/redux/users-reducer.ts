import {updateObjectArrayOverlap} from "../utils/object-helpers";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "./redux-store";
import {usersAPI} from "../API/users-api";
import {UserType} from "../types/users-types";

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

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
                users: updateObjectArrayOverlap(state.users, action.userId, 'id', {followed: true})

            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectArrayOverlap(state.users, action.userId, 'id', {followed: false})
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

export const actions = {
    acceptFollow: (userId: number) => <const>({type: FOLLOW, userId}),

    acceptUnfollow: (userId: number) => <const>({type: UNFOLLOW, userId}),

    addNewUsers: (data: { items: Array<UserType>, totalCount: number }) => <const>(
        {type: ADD_NEW_USER, users: data.items, totalCount: data.totalCount}),

    setCurrentPage: (page: number) => <const>({type: CURRENT_PAGE_CHANGED, page}),

    toggleIsFetched: (isFetched: boolean) => <const>({type: IS_FETCHED, isFetched}),


    followProgressing: (isFetched: boolean, userId: number) => <const>({
        type: FOLLOW_IN_PROGRESS, isFetched, userId
    })
}

export let getUsers = (page: number, pageSize: number): ThunkTypes =>
    async (dispatch) => {
        dispatch(actions.toggleIsFetched(false));
        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(actions.addNewUsers(data));
        dispatch(actions.toggleIsFetched(true))
    };

export let onClickCurrentPage = (page: number): ThunkTypes =>
    async (dispatch) => {
        dispatch(actions.setCurrentPage(page))
    }

export const follow = (userId: number): ThunkTypes => async (dispatch) => {
    _followUnfollowSwitch(dispatch, userId, usersAPI.followUser, actions.acceptFollow);
}

export const unfollow = (userId: number): ThunkTypes => async (dispatch) => {
    _followUnfollowSwitch(dispatch, userId, usersAPI.unfollowUser, actions.acceptUnfollow);
}

let _followUnfollowSwitch = async (dispatch: Dispatch<ActionsTypes>,
                                   userId: number,
                                   followCase: any,
                                   actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.followProgressing(true, userId));
    let data = await followCase(userId);

    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(actions.followProgressing(false, userId));
}

export default usersReducer;

///  Types \\\

type ActionsTypes = InferActionsType<typeof actions>

type ThunkTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>