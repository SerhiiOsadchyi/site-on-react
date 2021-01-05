import React from 'react';
import {
    follow,
    onClickCurrentPage,
    unfollow,
    followProgressing,
    getUsers
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    getFetchedState, getFollowInProgressStatus,
    getFollowProgressingState,
    getPageSize,
    getThisPage,
    getTotalCount,
    getUsersSelector
} from "../../redux/users-selector";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onChangePage = (pageNumber) => {
        this.props.onClickCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        //debugger;
        return <>
            {this.props.isFetched ? null : <Preloader/>}

            < Users users={this.props.users}
                    unfollow={this.props.unfollow}
                    currentPage={this.props.currentPage}
                    totalCount={this.props.totalCount}
                    pageSize={this.props.pageSize}
                    follow={this.props.follow}
                    onSelectedButton={this.onSelectedButton}
                    onChangePage={this.onChangePage}
                    followProgressing={this.props.followProgressing}
                    followInProgressStatus={this.props.followInProgressStatus}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        totalCount: getTotalCount(state),
        pageSize: getPageSize(state),
        currentPage: getThisPage(state),
        isFetched: getFetchedState(state),
        followProgressing: getFollowProgressingState(state),
        followInProgressStatus: getFollowInProgressStatus(state)
    }

};

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

export default compose(
    connect(mapStateToProps, { follow, unfollow, onClickCurrentPage, followProgressing, getUsers }),
    withAuthRedirect
)(UsersContainer);