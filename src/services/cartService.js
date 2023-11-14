import { userApi } from '../config/api'

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