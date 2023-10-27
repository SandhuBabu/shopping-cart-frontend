import axios from "axios"

const USER_API_BASE = "http://localhost:8080/api/v1/user"

export const userApi = axios.create({
    baseURL: USER_API_BASE,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json"
    }
})