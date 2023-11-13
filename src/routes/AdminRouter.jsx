import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../components/Layout/AdminLayout'
import {
    AddProductPage,
    AdminHomePage,
    EditProductPage,
    NotFound404,
    ProductPage,
    AdminProductsList
} from '../pages'


const AdminRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<AdminLayout />}>
                <Route
                    index
                    element={<AdminHomePage />}
                />
                <Route
                    path='/addProduct'
                    element={<AddProductPage />}
                />
                <Route
                    path='/editProduct/:id'
                    element={<EditProductPage />}
                />
                <Route
                    path='/products'
                    element={<AdminProductsList />}
                />
                <Route
                    path='/product/:id'
                    element={<ProductPage />}
                />
                <Route
                    path='/*'
                    element={<NotFound404 />}
                />
            </Route>
        </Routes>
    )
}

export default AdminRouter