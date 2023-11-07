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

export const editProductEndpoint = (product, id) => {
    return adminApi.post(`/editProduct/${id}`, product, {
        headers: {
            'Content-Type': 'multipart/mixed',
        }
    }).then(res => {
        return res?.data
    }).catch(err => {
        if (err?.status === 403)
            throw "no_user"
        const message = err?.response?.data?.message || "Failed to create new product"
        throw message
    })
}

export const deleteProductById = (id) => {
    return adminApi.delete(`/deleteProduct/${id}`)
    .then(res => {
        console.log(res?.data);
        return {error:false, message: res?.data?.message}
    }).catch(err => {
        const message = err?.response?.data?.message;
        return {error: false, message}
    })
}