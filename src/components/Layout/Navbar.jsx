import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { LoginModal } from '../index'
import { logout } from '../../features/userSlice'

const Navbar = () => {

  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(user);

  const handleLoginModal = () => {
    document.getElementById('my_modal_3').showModal()
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate("/", { replace: true })
    // window.location.reload();
  }


  return (
    <>
      <div className="navbar bg-base-100 shadow-xl sticky top-0 px-8 h-[5em]">
        <div className="flex-1">
          <Link to="/" className="normal-case text-2xl">Shpping Cart</Link>
        </div>

        {
          user?.username ?

            <div className="flex-none gap-3">
              <div className="dropdown dropdown-end ">
                <Link to='/cart'>
                  <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <div className="indicator">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      <span className="badge badge-sm badge-primary indicator-item">8</span>
                    </div>
                  </label>
                </Link>
              </div>

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  {/* <div className="w-10 rounded-full">
                  </div> */}
                  <div className="avatar w-10">
                    <div className="w-10 rounded-full">
                      <img src={user?.imageUrl ?? "https://t4.ftcdn.net/jpg/04/83/90/87/360_F_483908736_1HvJO1XjPHsvjeWJWANspi7i0tN0pYrP.jpg"} alt="" />
                    </div>
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <Link to="/profile" className='h-[2em]'>Profile</Link>
                  </li>
                  <li>
                    <Link to="/settings" className='h-8'>Settings</Link>
                  </li>
                  <button
                    className="btn btn-outline btn-primary h-[3em] w-[7em] ml-2 mt-3"
                    onClick={handleLogout}
                  >Logout</button>
                </ul>
              </div>
            </div>
            :
            <button className="btn btn-primary" onClick={handleLoginModal}>Login</button>
        }
      </div>

      {/* login modal */}
      {!user?.username && <LoginModal />}
    </>
  )
}

export default Navbar