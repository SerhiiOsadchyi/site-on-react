import {AppStateType} from "./redux-store";

export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
}
export const getTotalCount = (state: AppStateType) => {
   return state.usersPage.totalCount;
}
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}
export const getThisPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}
export const getFetchedState = (state: AppStateType) => {
    return state.usersPage.isFetched;
}
/*export const getFollowProgressingState = (state: AppStateType) => {
    return state.usersPage.followProgressing;
}*/
export const getFollowInProgressStatus = (state: AppStateType) => {
    return state.usersPage.followInProgressStatus;
}