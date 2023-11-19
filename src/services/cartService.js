import { userApi } from '../config/api'


export const getCartItems = (signal) => {
    return userApi.get('/cart', { signal })
        .then(res => {
            return { error: false, data: res?.data }
        }).catch(err => {
            return { error: true, data: res?.response?.data }
        })
}

export const addToCart = (productId) => {
    return userApi.post(`/cart/add/${productId}`)
        .then(res => {
            return { ...res?.data, error: false }
        })
        .catch(err => {
            return { ...err?.response?.data, error: true }
        })
}

export const removeFromCart = (productId) => {
    return userApi.delete(`/cart/${productId}`)
        .then(res => {
            return { ...res?.data, error: false }
        })
        .catch(err => {
            return { ...err?.response?.data, error: true }
        })
}

export const removeAll = () => {
    return userApi.delete('/cart/all')
        .then(() => true).catch(() => false)
}

export const findProductFromCart = productId => {
    return userApi.get(`/cart/find/${productId}`)
        .then(res => {
            return res?.data;
        })
        .catch(err => {
            return false;
        })
}

export const getCartCount = () => {
    return userApi.get('/cart/count')
        .then(res => {
            return res?.data
        })
        .catch(err => 0)
}

export const checout = (signal) => {
    return userApi.post("/cart/checkout", { signal })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
}