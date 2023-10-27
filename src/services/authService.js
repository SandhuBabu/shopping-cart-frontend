import axios from 'axios'
import { setLocalTokens } from '../utils/authUtil'

const AUTH_BASE_URL = "http://localhost:8080/api/auth"

export const signup = async (data) => {
    try {
        const res = await axios.post(`${AUTH_BASE_URL}/signup`, data)
        setLocalTokens(res.data.accessToken, res.data.refreshToken)
        return {
            userData: res.data,
            error: false,
            message: ""
        };
    } catch (error) {
        throw { error: true, message: error.response.data.message }
    }

}

export const login = async (data) => {
    try {
        const res = await axios.post(`${AUTH_BASE_URL}/signin`, data)
        setLocalTokens(res.data.accessToken, res.data.refreshToken)
        return {
            userData: res.data,
            error: false,
            message: ""
        };
    } catch (error) {
        throw { error: true, message: error.response.data.message }
    }
}

export const refresh = async (token) => {
    const form = new FormData();
    form.set("refreshToken", token)
    try {
        const res = await axios.post(`${AUTH_BASE_URL}/refresh`, form)
        setLocalTokens(res.data.accessToken, res.data.refreshToken)
        return res.data
    } catch (error) {
        throw error
    }
}