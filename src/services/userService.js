import { userApi } from "../config/api";
import axios from 'axios'

export const getUser = async () => {
  try {
    let user = await axios.get("http://localhost:8080/api/v1/user", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }
    })

    return user.data;
  } catch (err) {
    throw err.response
  }
}

export const updateUser = (data) => {
  return userApi.post("/update", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then(res => ({ message: res?.data, error: false }))
    .catch(err => ({ message: err?.response?.data, error: true }))
}

export const addAddress = (data) => {
  return userApi.post("/addAddress", data, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => ({
      res: res?.data,
      error:false
    }))
    .catch(err => ({
      res: err?.response?.data,
      error:true
    }))
}

export const getAddress = (signal) => {
  return userApi.get("/address", {signal})
    .then(res => {
      const error = res?.data?.id === null;
      return {
        res: res?.data,
        error
      }
    })
    .catch(err => {
      return {
        res: err?.response?.data,
        error: true
      }
    })
}