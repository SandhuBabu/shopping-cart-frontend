import { openApi } from "../config/api"

export const getProductById = (id, signal) => {
   return openApi.get(`/products/${id}`, { signal })
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

export const getNewArrivals = () => {
   return openApi.get("/products/newArrivals")
      .then(res => res?.data)
      .catch(err => [])
}

export const getBudgetFriendlyProducts = () => {
   return openApi.get("/products/budgetProducts")
      .then(res => res?.data ?? [])
      .catch(() => [])
}

export const getSearchItems = (query, pageNo, signal) => {
   return openApi.get(`/products/searchWithFilters?${query}&pageNo=${pageNo}`, { signal })
      .then(res => ({ ...res?.data, error: false }))
      .catch(err => ({ ...err?.response?.data, error: true }))
}

export const getSearchResults = (term, pageNo, signal) => {
   return openApi.get(`/products/search/${term}?pageNo=${pageNo}`, {signal})
      .then(res => ({ ...res.data, error: false }))
      .catch(err => ({ ...err?.response?.data, error: true }))
}