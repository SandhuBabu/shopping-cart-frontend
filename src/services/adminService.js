import { adminApi } from "../config/api";


export const addProductEndpoint = (product) => {
    return adminApi.post("/addProduct", product, {
        headers: {
            'Content-Type': 'multipart/mixed',
        }
    }).then(res => {
        console.log(res?.data);
        return res?.data
    }).catch(err => {
        if (err?.status === 403)
            throw "no_user"
        const message = err?.response?.data?.message || "Failed to create new product"
        throw message
    })
}