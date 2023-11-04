import axios from "axios"

const USER_API_BASE = "http://localhost:8080/api/v1/user"
const ADMIN_API_BASE = "http://localhost:8080/api/v1/admin"
const OPEN_API_BASE = "http://localhost:8080/api/v1/open"

export const userApi = axios.create({
    baseURL: USER_API_BASE,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json"
    }
})

export const adminApi = axios.create({
    baseURL: ADMIN_API_BASE,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json"
    }
})

export const openApi = axios.create({
    baseURL: OPEN_API_BASE,
    headers: {
        "Content-Type": "application/json"
    }
})