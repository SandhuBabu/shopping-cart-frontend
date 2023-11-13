import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    content: [],
    pageNo: undefined,
    totalPages: undefined,
    first: true,
    last: false,
    empty: true
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProducts: (state, { payload }) => {
            state.content = [...state.content, ...payload.content]
            state.pageNo = payload.pageNo
            state.totalPages = payload.totalPages
            state.first = payload.first
            state.last = payload.last
            state.empty = payload.empty
        },
        setProductsEmpty: (state) => {
            state.content = []
            state.pageNo = undefined
            state.totalPages = undefined
            state.first = true
            state.last = false
            state.empty = true
        },
        updateContent: (state, {payload}) => {
            state.content = payload
        }
    }
})

export const { addProducts, setProductsEmpty, updateContent } = productSlice.actions

export default productSlice.reducer