import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/Layout/MainLayout'
import {
    CartPage,
    CategoryPage,
    HomePage,
    NotFound404,
    OrderSummaryPagePage,
    OrdersPage,
    ProductPage,
    ProductsResults,
    ProfilePage,
    SearchRsults,
} from '../pages'
import { Signup } from '../components'


const UserRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route
                    index
                    element={<HomePage />}
                />
                <Route
                    path='cart'
                    element={<CartPage />}
                />
                <Route
                    path='signup'
                    element={<Signup />}
                />
                <Route
                    path='/product/:id'
                    element={<ProductPage />}
                />
                <Route
                    path='/products'
                    element={<ProductsResults />}
                />
                <Route
                    path='/category/:cat'
                    element={<CategoryPage />}
                />
                <Route
                    path='/search/:term'
                    element={<SearchRsults />}
                />
                <Route path='/orders'>
                    <Route index element={<OrdersPage />} />
                    <Route path=':id' element={<OrderSummaryPagePage />} />
                </Route>
                <Route
                    path='/profile'
                    element={<ProfilePage />}
                />

                <Route
                    path='/*'
                    element={<NotFound404 />}
                />
            </Route>
        </Routes>
    )
}

export default UserRouter