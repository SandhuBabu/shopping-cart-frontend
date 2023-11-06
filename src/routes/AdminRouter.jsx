import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../components/Layout/AdminLayout'
import { 
    AddProductPage, 
    AdminHomePage, 
    EditProductPage, 
    NotFound404, 
    ProductPage,
    ProductsList 
} from '../pages'


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
                    path='/editProduct/:id'
                    element={
                        <Suspense fallback={<>Loading Admin Product Edit Page</>}>
                            <EditProductPage />
                        </Suspense>
                    }
                />
                <Route
                    path='/products'
                    element={
                        <Suspense fallback={<>Loading Admin ProductList Page</>}>
                            <ProductsList />
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