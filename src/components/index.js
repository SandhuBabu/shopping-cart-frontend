import { lazy } from 'react';

// user components
const LazyUserHeader = lazy(() => import('./UserComponents/Header/Header'));

export {
    LazyUserHeader as UserHeader,
}

// admin components
const LazyAdminHeader = lazy(() => import('./AdminComponents/Header/Header'));
const LazyProductsTable = lazy(() => import('./AdminComponents/DataTable/ProductsTable'));

export {
    LazyAdminHeader as AdminHeader,
    LazyProductsTable as ProductsTable,
}



// commons components
const LazyLoginModal = lazy(() => import('./CommonComponents/Auth/LoginModal'));
const LazySignup = lazy(() => import('./CommonComponents/Auth/Signup'));
const LazyNavbar = lazy(() => import('../components/CommonComponents/Navbar/Navbar'));

const LazyCarousal = lazy(() => import('./UserComponents/Home/Carousal'));
const LazyNewItems = lazy(() => import('./UserComponents/Home/NewItems'));
const LazyItemCard = lazy(() => import('./CommonComponents/Card/ItemCard'));
const LazyProductPageImage = lazy(() => import('./CommonComponents/Card/ProductPageImage'));
const LazyFooter = lazy(() => import('./CommonComponents/Footer/Footer'));
const LazyPagination = lazy(() => import('./CommonComponents/Pagination/Pagination'))

// export commons
export {
  LazyLoginModal as LoginModal,
  LazySignup as Signup,
  LazyNavbar as Navbar,
  LazyCarousal as Carousal,
  LazyNewItems as NewItems,
  LazyItemCard as ItemCard,
  LazyProductPageImage as ProductPageImage,
  LazyFooter as Footer,
  LazyPagination as Pagination,
};

export {Input} from './CommonComponents/FormElements/Input'
export {default as Select} from './CommonComponents/FormElements/Select'