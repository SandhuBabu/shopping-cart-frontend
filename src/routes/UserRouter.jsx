import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/Layout/MainLayout'
import {
    AddressPage,
    CartPage,
    CategoryPage,
    HomePage,
    NotFound404,
    OrderProduct,
    OrderSummaryPagePage,
    OrdersPage,
    PrivateLayout,
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
                    element={
                        <PrivateLayout>
                            <CartPage />
                        </PrivateLayout>
                    }
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
                <Route path='/orders' element={<PrivateLayout />} >
                    <Route
                        index
                        element={<OrdersPage />}
                    />
                    <Route
                        path=':id'
                        element={<OrderSummaryPagePage />}
                    />
                    <Route
                        path='confirm/:id'
                        element={<OrderProduct />}
                    />
                </Route>
                <Route path='/profile' element={<PrivateLayout />}>
                    <Route
                        index
                        element={<ProfilePage />}
                    />
                    <Route
                        path='address'
                        element={<AddressPage />}
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

export default UserRouter