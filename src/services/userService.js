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