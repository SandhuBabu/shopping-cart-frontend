import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../components/Layout/AdminLayout'
import { AddProductPage, AdminHomePage, NotFound404, ProductPage } from '../pages'


const AdminRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<AdminLayout />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<>Loading Admin Page</>}>
                            <AdminHomePage />
                        </Suspense>
                    }
                />
                <Route
                    path='/addProduct'
                    element={
                        <Suspense fallback={<>Loading Admin Product Add Page</>}>
                            <AddProductPage />
                        </Suspense>
                    }
                />
                <Route
                    path='/product/:id'
                    element={
                        <Suspense fallback={<>Loading Product Page</>}>
                            <ProductPage />
                        </Suspense>
                    }
                />
                <Route
                    path='/*'
                    element={
                        <NotFound404 />
                    }
                />
            </Route>
        </Routes>
    )
}

export default AdminRouter