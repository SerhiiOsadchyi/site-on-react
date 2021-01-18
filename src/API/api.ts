import axios from "axios";
import {ProfileType} from "../types/types";

let instance = axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            'API-KEY': '67f77f47-5e9a-4870-944d-afb0cd81f17b'
        }
    }
)

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    followUser(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },

    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    getProfile(userId: number) {
        console.log(' Deprecated method - a new method is profileAPI.getProfile(userId) ');
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status});
    },
    saveAvatar(photo: any) {
        const formData = new FormData();
        formData.append('image', photo);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profileData: ProfileType) {
        return instance.put(`profile`, profileData);
    }
}

export enum ResultCodes {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    Captcha = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    },
    resultCode: ResultCodes,
    messages: Array<string>
}

type LoginResponseType = {
    resultCode: ResultCodes | ResultCodeForCaptcha,
    messages: Array<string>,
    data: {
        userId: number
    }
}
type LogoutResponseType = {
    resultCode: ResultCodes,
    messages: Array<string>,
    data: { }
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>('auth/login').then(response => response.data)
    }
}

export const securityAPI = {
    captchaURL() {
        return instance.get(`security/get-captcha-url`);
    }
}
