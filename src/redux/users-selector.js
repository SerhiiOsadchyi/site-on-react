export const getUsersSelector = (state) => {
    return state.usersPage.users;
}
export const getTotalCount = (state) => {
   return state.usersPage.totalCount;
}
export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}
export const getThisPage = (state) => {
    return state.usersPage.currentPage;
}
export const getFetchedState = (state) => {
    return state.usersPage.isFetched;
}
export const getFollowProgressingState = (state) => {
    return state.usersPage.followProgressing;
}
export const getFollowInProgressStatus = (state) => {
    return state.usersPage.followInProgressStatus;
}