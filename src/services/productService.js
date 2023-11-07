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

export const getAllProductsPaginated = (pageNo, sort, signal) => {
   return openApi.get(`/products?pageNo=${pageNo}&pageSize=10&sort=${sort}`, { signal })
      .then(res => {
         const { content, ...rest } = res?.data
         return { error: false, data: content, ...rest }
      })
      .catch(err => {
         const error = err?.response?.data
         return { data: error, error: true }
      })
}