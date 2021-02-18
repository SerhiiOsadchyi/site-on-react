import React, {FC} from 'react';
import s from './Profile.module.css';
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfilePropsTypePromise} from "../../types/profile-types";

const Profile: FC<ProfilePropsTypePromise> = (props) => {

    return (
        <div className={s.content}>
            <PersonalInfo
                isAuthUser={props.isAuthUser}
                saveAvatar={props.saveAvatar}
                saveProfileData={props.saveProfileData}
                profile={props.profile}
                status={props.status}
                updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer/>
        </div>
    )

};

export default Profile;

