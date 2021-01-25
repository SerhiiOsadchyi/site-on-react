import React from 'react';
import {follow, unfollow, getUsers, onClickCurrentPage} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect, ConnectedProps} from "react-redux";
import {
    getFetchedState,
    getFollowInProgressStatus,
    getPageSize,
    getThisPage,
    getTotalCount,
    getUsersSelector
} from "../../redux/users-selector";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    totalCount: number
    isFetched: boolean
    followInProgressStatus: Array<number>
    users: Array<UserType>
}

class UsersContainer extends React.Component<PropsFromRedux> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onChangePage = (pageNumber: number) => {
        this.props.onClickCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetched ? null : <Preloader/>}

            < Users users={this.props.users}
                    unfollow={this.props.unfollow}
                    currentPage={this.props.currentPage}
                    totalCount={this.props.totalCount}
                    pageSize={this.props.pageSize}
                    follow={this.props.follow}
                    onChangePage={this.onChangePage}
                    followInProgressStatus={this.props.followInProgressStatus}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersSelector(state),
        totalCount: getTotalCount(state),
        pageSize: getPageSize(state),
        currentPage: getThisPage(state),
        isFetched: getFetchedState(state),
        followInProgressStatus: getFollowInProgressStatus(state)
    }

};

const redirectUsersContainer = withAuthRedirect(UsersContainer)
const connector = connect(mapStateToProps, {
    follow,
    unfollow,
    onClickCurrentPage,
    getUsers
})

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(redirectUsersContainer);
//export default compose(connector, withAuthRedirect)(UsersContainer);

/*type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    onClickCurrentPage: (pageNumber: number) => void
    unfollow: () => void
    follow: () => void
}*/

//type PropsType = MapStatePropsType & MapDispatchPropsType

/*let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalCount: state.usersPage.totalCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetched: state.usersPage.isFetched,
        followProgressing: state.usersPage.followProgressing,
        followInProgressStatus: state.usersPage.followInProgressStatus,
    }

};*/

/*export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
        fol: follow,
        unfollow,
        onClickCurrentPage,
        followProgressing,
        getUsers
    }),
    withAuthRedirect)(UsersContainer);*/