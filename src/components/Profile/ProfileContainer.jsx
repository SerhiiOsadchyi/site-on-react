import React from 'react';
import Profile from "./Profile";
import {
    getUserProfile,
    getUserStatus,
    saveAvatar,
    saveProfileData,
    updateUserStatus
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";

class ProfileContainer extends React.Component {
    refreshProfilePage() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.userAuthorizedId;
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfilePage();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfilePage();
        }
    }

    render() {
        //debugger;
        return (
            <Profile isAuthUser={!this.props.match.params.userId}
                     status={this.props.status}
                     saveAvatar={this.props.saveAvatar}
                     saveProfileData={this.props.saveProfileData}
                     profile={this.props.profile}
                     updateUserStatus={this.props.updateUserStatus}/>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    saveAvatar: state.profilePage.saveAvatar,
    saveProfileData: state.profilePage.saveProfileData,
    userAuthorizedId: state.userAuthorize.userId
});

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, saveAvatar, saveProfileData}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);