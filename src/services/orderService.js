import { orderApi } from "../config/api"

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