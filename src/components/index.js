import { lazy } from 'react';

// user components
const LazyUserHeader = lazy(() => import('./UserComponents/Header/Header'));
const LazyCartCard = lazy(() => import('./UserComponents/Cart/CartCard'));
const LazyRating = lazy(() => import('./UserComponents/Rating/Rating'));
const LazyCount = lazy(() => import('./UserComponents/ProductBuy/Count'));

export {
    LazyUserHeader as UserHeader,
    LazyCartCard as CartCard,
    LazyRating as Rating,
    LazyCount as Count,
}

// admin components
const LazyAdminHeader = lazy(() => import('./AdminComponents/Header/Header'));
const LazyProductsTable = lazy(() => import('./AdminComponents/DataTable/ProductsTable'));
const LazyAdminSidebar = lazy(() => import('./AdminComponents/Sidebar/Sidebar'));
const LazyAdminStats = lazy(() => import('./AdminComponents/Home/Stats'));
const LazyAdminHomeOrdersTable = lazy(() => import('./AdminComponents/Home/OrdersTable'));
const LazyAdminHomeChart = lazy(() => import('./AdminComponents/Home/Chart'));

export {
    LazyAdminHeader as AdminHeader,
    LazyProductsTable as ProductsTable,
    LazyAdminSidebar as AdminSidebar,
    LazyAdminStats as AdminStats,
    LazyAdminHomeOrdersTable as AdminHomeOrdersTable,
    LazyAdminHomeChart as AdminHomeChart,
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
const LazyBreadCrumb = lazy(() => import('./CommonComponents/BreadCrumbs/BreadCrumbs'))
const LazyModal = lazy(() => import('./CommonComponents/Modal/Modal'))
const LazyAlert = lazy(() => import('./CommonComponents/Alert/Alert'))
const LazyToast = lazy(() => import('./CommonComponents/Alert/Toast'))
const LazyProductsList = lazy(()=>import('./CommonComponents/Products/ProductsList'))
const LazyProductsFilter = lazy(()=>import('./CommonComponents/Products/ProductsFilter'))
const LazySort = lazy(()=>import('./CommonComponents/Products/Sort'))
const LazySomethingwrong = lazy(()=>import('./CommonComponents/SomethingWrong/SomethingWrong'))

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
  LazyBreadCrumb as BreadCrumb,
  LazyModal as Modal,
  LazyAlert as Alert,
  LazyToast as Toast,
  LazyProductsFilter as ProductsFilter,
  LazyProductsList as ProductsList,
  LazySort as Sort,
  LazySomethingwrong as SomethingWrong,
};

export {Input} from './CommonComponents/FormElements/Input'
export {default as Select} from './CommonComponents/FormElements/Select'