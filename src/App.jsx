import UserRouter from './routes/UserRouter'
import AdminRouter from './routes/AdminRouter'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './features/userSlice'
import { refresh } from './services/authService'
import { Suspense, useEffect } from 'react'
import { getUser } from './services/userService'
import { Routes } from 'react-router-dom'

function App() {

  const dispatch = useDispatch();
  const user = useSelector(store => store.user)
  console.log(user);

  useEffect(() => {
    console.log("APP_MOUNTED");
    return () => console.log("APP_MOUNTED");
  }, [])


  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      handleGetUser();
    }
  }, [])

  const handleGetUser = async () => {
    try {
      const user = await getUser();
      if (user) {
        dispatch(setUser(user));
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
    return <Suspense fallback={<>ADMIN_ROUTES</>}>
      <AdminRouter />
    </Suspense>

  return <>
    <Suspense fallback={<>USER_ROUTES</>}>
      <UserRouter />
    </Suspense>
  </>
}
export default App
