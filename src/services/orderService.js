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