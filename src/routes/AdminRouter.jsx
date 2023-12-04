import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../components/Layout/AdminLayout'
import {
    AddProductPage,
    AdminHomePage,
    EditProductPage,
    NotFound404,
    ProductPage,
    AdminProductsList,
    AdminAllOrders,
    AdminOrderDetails,
    AdminStockOut,
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
                <Route path='/products'>
                    <Route
                        index
                        element={<AdminProductsList />}
                    />
                    <Route
                        path='edit/:id'
                        element={<EditProductPage />}
                    />
                    <Route
                        path='outofstock'
                        element={<AdminStockOut />}
                    />
                </Route>

                <Route
                    path='/product/:id'
                    element={<ProductPage />}
                />
                <Route path='/orders'>
                    <Route
                        index
                        element={<AdminAllOrders />}
                    />
                    <Route
                        path=':id'
                        element={<AdminOrderDetails />}
                    />
                </Route>
                <Route
                    path='/*'
                    element={<NotFound404 />}
                />
            </Route>
        </Routes>
    )
}

export default AdminRouter