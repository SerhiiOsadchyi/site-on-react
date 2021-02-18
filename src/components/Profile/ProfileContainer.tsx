import React from 'react';
import Profile from "./Profile";
import {
    getUserProfile,
    getUserStatus,
    saveAvatar,
    saveProfileData,
    updateUserStatus
} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/profile-types";

class ProfileContainer extends React.Component<PropsType> {

    refreshProfilePage() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.userAuthorizedId;
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfilePage();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfilePage();
        }
    }

    render() {
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

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    //saveAvatar: state.profilePage.saveAvatar,
    //saveProfileData: state.profilePage.saveProfileData,
    userAuthorizedId: state.userAuthorize.userId
});

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, saveAvatar, saveProfileData}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

type StatePropsType = {
    profile: ProfileType| null,
    status: string,
    userAuthorizedId: number
}
type DispatchPropsType = {
    getUserProfile: (userId: number) => void,
    getUserStatus:  (userId: number) => void,
    updateUserStatus:  (status: string) => void,
    saveAvatar: (photo: File) => void,
    saveProfileData: (profileData: ProfileType) => Promise<void>
}
type RouterParamsType = {
    userId: string;
};
type RouterParamsProps = RouteComponentProps<RouterParamsType>;

type PropsType = StatePropsType & DispatchPropsType & RouterParamsProps