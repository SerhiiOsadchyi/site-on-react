export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string,
    large: string
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType,
    photos: PhotosType,
    aboutMe: string
}
export type ProfilePropsType = {
    isAuthUser: boolean,
    profile: ProfileType | null,
    status: string,
    updateUserStatus: (status: string) => void,
    saveAvatar: (photo: File) => void,
    saveProfileData: (profileData: ProfileType) => void
}
export type ProfilePropsTypePromise = {
    isAuthUser: boolean,
    profile: ProfileType | null,
    status: string,
    updateUserStatus: (status: string) => void,
    saveAvatar: (photo: File) => void,
    saveProfileData: (profileData: ProfileType) => Promise<void>
}