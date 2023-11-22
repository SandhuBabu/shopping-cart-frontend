import { lazy } from 'react';

// user pages
const LazyHomePage = lazy(() => import('./UserPages/HomePage/HomePage'));
const LazyProductPage = lazy(() => import('./ProductPage/ProductPage'));
const LazyCartPage = lazy(() => import('./UserPages/CartPage/CartPage'));
const LazyOrdersPage = lazy(() => import('./UserPages/Orders/OrdersPage'));
const LazyOrderSummaryPage = lazy(() => import('./UserPages/Orders/OrderSummaryPage'));
const LazyProfilePage = lazy(() => import('./UserPages/Profile/ProfilePage'));
const LazyAddressPage = lazy(() => import('./UserPages/Profile/AddressPage'));
const LazyOrderProduct = lazy(() => import('./UserPages/Orders/OrderProduct'));

export {
  LazyHomePage as HomePage,
  LazyProductPage as ProductPage,
  LazyCartPage as CartPage,
  LazyOrdersPage as OrdersPage,
  LazyOrderSummaryPage as OrderSummaryPagePage,
  LazyProfilePage as ProfilePage,
  LazyAddressPage as AddressPage,
  LazyOrderProduct as OrderProduct,
};



// admin pages
const LazyAdminHomePage = lazy(() => import('./AdminPages/HomePage'))
const LazyAddProductPage = lazy(() => import('./AdminPages/AddProduct'))
const LazyEditProductPage = lazy(() => import('./AdminPages/EditProduct'))
const LazyProductList = lazy(() => import('./AdminPages/ProductsList'))
export {
  LazyAdminHomePage as AdminHomePage,
  LazyAddProductPage as AddProductPage,
  LazyEditProductPage as EditProductPage,
  LazyProductList as AdminProductsList,
}



//  common pages
const LazyNotFound404 = lazy(() => import('./404/NotFound404'));
const LazyProductsResults = lazy(() => import('./ProductPage/ProductsResults'))
const LazyCategory = lazy(() => import('./ProductPage/Category'))
const LazySearchResults = lazy(() => import('./ProductPage/SearchRsults'))
export {
  LazyNotFound404 as NotFound404,
  LazyProductsResults as ProductsResults,
  LazyCategory as CategoryPage,
  LazySearchResults as SearchRsults,
};



// private Layout
const Private = lazy(() => import("../components/Layout/Private"))

export {
  Private as PrivateLayout
};
