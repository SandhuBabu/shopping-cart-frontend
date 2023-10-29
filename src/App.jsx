import UserRouter from './routes/UserRouter'
import { useDispatch } from 'react-redux'
import { setUser } from './features/userSlice'
import { refresh } from './services/authService'
import { useEffect } from 'react'
import { getUser } from './services/userService'
import { showLoginModal } from './utils/authUtil'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("APP_MOUNTED");
    return () => console.log("APP_MOUNTED");
  }, [])


  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      handleGetUser();
    } else {
      showLoginModal()
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
    if(!refreshToken || refreshToken === undefined) {
      showLoginModal()
      return
    }
    
    try {
      const user = await refresh(refreshToken);
      dispatch(setUser(user))
    } catch (err) {
      showLoginModal();
    }
  }


  return <>
    <UserRouter />
  </>

}
export default App
