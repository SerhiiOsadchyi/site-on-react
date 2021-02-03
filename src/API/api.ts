import axios from "axios";

export let instance = axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            'API-KEY': '67f77f47-5e9a-4870-944d-afb0cd81f17b'
        }
    }
)