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
            return { error: false, message: res?.data?.message }
        }).catch(err => {
            const message = err?.response?.data?.message;
            return { error: false, message }
        })
}

export const getAllOrdersForAdmin = (pageNo, signal) => {
    return adminApi.get(`/orders/all/${pageNo}`, { signal })
        .then(res => res?.data)
        .catch(err => {
            console.log(err);
            return [];
        })
}

export const getOrdersCountByStatus = (status, signal) => {
    return adminApi.get(`/orders/${status}/count`, { signal })
        .then(res => res?.data)
        .catch(err => {
            console.log(err);
            return 0;
        })
}

export const changeStatus = (id, status) => {
    return adminApi.post(`/orders/${id}/changeStatus/${status}`)
        .then(res => ({ message: res?.data, error: false }))
        .catch(err => ({ message: err?.response?.data, error: true }))
}

export const dashboardDetails = (signal) => {
    return adminApi('/dashboard', { signal })
        .then(res => res?.data)
        .catch(err => {
            console.log(err)
            return
        })
}
