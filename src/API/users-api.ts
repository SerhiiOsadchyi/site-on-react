import {instance} from "./api";
import {APIResponseType} from "../types/type-api";
import {GetUsersType} from "../types/users-types";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get<GetUsersType>
        (`users?page=${currentPage}&count=${pageSize}`).then(response => {return response.data} )
    },

    followUser(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
            .then(response => { return response.data })
    },

    unfollowUser(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`)
            .then(response => { return response.data })
    }
}
