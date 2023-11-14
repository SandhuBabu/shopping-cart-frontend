import { Suspense, useEffect, useLayoutEffect } from 'react'
import UserRouter from './routes/UserRouter'
import AdminRouter from './routes/AdminRouter'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './features/userSlice'
import { refresh } from './services/authService'
import { getUser } from './services/userService'
import { getCartCount } from './services/cartService'

function App() {

  const dispatch = useDispatch();
  const user = useSelector(store => store.user)

  useEffect(() => {
    console.log("APP_MOUNTED");
    return () => console.log("APP_MOUNTED");
  }, [])


  useLayoutEffect(() => {
    if (localStorage.getItem("accessToken")) {
      handleGetUser();
    }
  }, [])

  const handleGetUser = async () => {
    try {
      const user = await getUser();
      const cartCount = await getCartCount();
      if (user) {
        dispatch(setUser({...user, cartCount}));
      }
    } catch (err) {
      handleRefresh();
    }
  }

  const handleRefresh = async () => {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken || refreshToken === undefined) {
      document.getElementById("login_modal").showModal();
      return
    }

    try {
      const user = await refresh(refreshToken);
      dispatch(setUser(user))
    } catch (err) {
      document.getElementById("login_modal").showModal();
    }
  }


  if (user?.role === "ADMIN")
    return <Suspense fallback={<Loading />}>
      <AdminRouter />
    </Suspense>

  return <>
    <Suspense fallback={<Loading />}>
      <UserRouter />
    </Suspense>
  </>
}
export default App


const Loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <span className="loading loading-ring loading-lg"></span>
    </div>
  )
}