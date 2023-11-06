import { openApi } from "../config/api"

export const getProductById = (id) => {
   return openApi.get(`/products/${id}`)
      .then(res => {
         return { error: false, ...res.data }
      }).catch(err => {
         const error = err?.response?.data
         return { ...error, error: true }
      })
}

export const getAllProductsPaginated = (pageNo) => {
   return openApi.get(`/products?pageNo=${pageNo}`)
      .then(res => {
         const {content, ...rest} = res?.data
         return {error: false, data: content, ...rest}
      })
      .catch(err => {
         const error = err?.response?.data
         return { data:error, error: true }
      })
}