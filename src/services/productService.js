import { openApi } from "../config/api"

export const getProductById = (id) => {
    return openApi.get(`/product/${id}`)
     .then(res => {
        return {error:false, ...res.data}
     }).catch(err => {
        const error = err?.response?.data
        return {...error, error: true}
     })
}