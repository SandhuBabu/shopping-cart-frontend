import { lazy } from 'react';

// user pages
const LazyHomePage = lazy(() => import('./UserPages/HomePage/HomePage'));
const LazyProductPage = lazy(() => import('./ProductPage/ProductPage'));
const LazyCartPage = lazy(() => import('./UserPages/CartPage/CartPage'));

export {
  LazyHomePage as HomePage,
  LazyProductPage as ProductPage,
  LazyCartPage as CartPage,
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

