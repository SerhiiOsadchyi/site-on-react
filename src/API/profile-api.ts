import {instance} from "./api";
import {APIResponseType} from "../types/type-api";
import {PhotosType, ProfileType} from "../types/profile-types";

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => { return response.data });
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => { return response.data });
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status})
            .then(response => { return response.data });
    },
    saveAvatar(photo: File) {
        const formData = new FormData();
        formData.append('image', photo);
        return instance.put<APIResponseType<SavePhotoType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => { return response.data });
    },
    saveProfile(profileData: ProfileType) {
        return instance.put<APIResponseType<ProfileType>>(`profile`, profileData)
            .then(response => { return response.data });
    }
}

type SavePhotoType = {
    photos: PhotosType
}