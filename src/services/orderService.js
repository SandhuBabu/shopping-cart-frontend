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
    return orderApi.post("/create/success", data)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
}


// export 