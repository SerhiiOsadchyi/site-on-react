import {PhotosType} from "./profile-types";

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
export type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}