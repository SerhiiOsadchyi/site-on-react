import React, {ChangeEvent, FC, useState} from 'react';
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from '../../../assets/image/User-icon.png';
import ProfileStatusUseEffect from "./ProfileStatusUseEffect";
import ProfileDataEditFormRedux from "./ProfileDataEditForm";
import {ContactsType, ProfilePropsTypePromise, ProfileType} from "../../../types/profile-types";

const PersonalInfo: FC<ProfilePropsTypePromise> = ({status, profile, updateUserStatus, isAuthUser, saveAvatar, saveProfileData, ...props}) => {

    const [editMode, setEditMode] = useState(false);

    const profileData = (values: ProfileType) => {
        saveProfileData(values).then(
            () => {
                setEditMode(false);
            }
        )
    }

    if (!profile) {
        return <Preloader/>
    }

    const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            saveAvatar(e.target.files[0])
        }
    };

    const onEditMode = () => {
        setEditMode(true)
    }

    return (
        <div>
            <img src={profile.photos.large ? profile.photos.large : userPhoto} alt='avatar'/>
            {isAuthUser && <input type='file' onChange={onChangeAvatar}/>}

            <ProfileStatusUseEffect status={status} updateUserStatus={updateUserStatus}/>

            {editMode
                ? <ProfileDataEditFormRedux initialValues={profile} profile={profile} onSubmit={profileData}/>
                : <ProfileData profile={profile} isAuthUser={isAuthUser} onEditMode={onEditMode}/>}

        </div>
    )

};

const ProfileData: FC<ProfileDataType> = ({profile, isAuthUser, onEditMode}) => {
    if (profile) {

        return (
            <div>
                {isAuthUser && <button onClick={onEditMode}>Edit profile</button>}
                <div>
                    <b>My name: </b>{profile.fullName}
                </div>
                <div>
                    <b>About me: </b>{profile.aboutMe}
                </div>
                <div>
                    <b>I'm looking for a job: </b>{profile.lookingForAJob ? 'Yes' : 'No'}
                </div>
                <div>
                    <b>Description a job that I want: </b>{profile.lookingForAJobDescription}
                </div>
                <div>
                    <b>My contacts: </b>
                </div>
                <div>
                    {Object.keys(profile.contacts).map((key) => {
                        return <Contact key={key} fieldName={key} fieldValue={profile.contacts[key as keyof ContactsType]}/>
                    })}
                </div>
            </div>
        )
    }
    return null

}

const Contact: FC<ContactPropsType> = ({fieldName, fieldValue}) => {
    return <div><b>{fieldName}:</b> {fieldValue}</div>
}

export default PersonalInfo;

export type ProfileFormPropsType = {
    profile: ProfileType
}

type ProfileDataType = {
    profile: ProfileType | null,
    isAuthUser: boolean,
    onEditMode:() => void
}

type ContactPropsType = {
    fieldName: string,
    fieldValue: string
}