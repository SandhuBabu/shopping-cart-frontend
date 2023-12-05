import { orderApi } from "../config/api"
import { refresh } from "./authService"

export const createOrder = async (orderData) => {
    return orderApi.post("/create", orderData)
        .then(res => ({ error: false, order: res?.data }))
        .catch(() => {
            return ({
                error: true,
                order: null
            })
        })
}

export const orderSuccess = (data) => {
    return orderApi.post("/payment/success", data)
        .then(res => ({
            error: false,
            message: res?.data
        }))
        .catch(err => ({
            error: true,
            message: err?.response?.data
        }))
}


export const paymentFailure = data => {
    return orderApi.post("payment/failure", data)
        .then(res => res?.data)
        .catch(err => {
            console.log(err);
            return "failed to save payment failure data"
        })
}

export const allOrders = (signal) => {
    return orderApi.get()
        .then(res => res?.data)
        .catch(err => {
            console.log(err)
            return []
        })
}

export const rateProduct = (id, rating) => {
    return orderApi.post(`${id}/addRating/${rating}`)
        .then(res => ({
            message: res?.data,
            error: false
        }))
        .catch(err => {
            console.log(err);
            if (err?.response?.status === 403) {
                refresh()
                return {
                    message: "Failed to add rating",
                    error: true
                }

            } else {
                return {
                    message: err?.response?.data,
                    error: true
                }
            }
        })
}

export const cancelOrder = (id) => {
    return orderApi.post(`/cancel/${id}`)
        .then(res => ({ error: false, message: res?.data }))
        .catch(err => {
            console.log(err);
            return { error: true, message: err?.response?.data }
        })
}

export const returnorder = (id) => {
    return orderApi.post(`/return/${id}`)
        .then(res => ({ error: false, message: res?.data }))
        .catch(err => {
            console.log(err);
            return { error: true, message: err?.response?.data }
        })
}

