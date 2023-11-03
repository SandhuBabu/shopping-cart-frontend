import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { LoginModal } from '../..';
import NavRight from './NavRight';
import SearchModal from './SearchModal';

const Navbar = () => {

  const user = useSelector(state => state.user);

  const handleSearchOpenClick = () => {
    document.getElementById("search_modal").showModal();
  }

  return (
    <>
      <div style={{ zIndex: 99 }} className="navbar bg-base-100 shadow-xl sticky top-0 px-8 h-[5em]">
        <div className="flex-1">

          {
            user.role === "ADMIN" &&
            <div className='px-4'>
              <label htmlFor="my-drawer" className="btn btn-ghost btn-circle">
                <span style={{ fontSize: '35px' }} className="material-symbols-outlined">
                  menu
                </span>
              </label>
            </div>
          }

          <Link to="/" className="font-semibold text-2xl">
            Shopping Cart
          </Link>
        </div>

        <button onClick={handleSearchOpenClick} className="btn btn-ghost btn-circle mx-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>

        <NavRight />
      </div>

      <SearchModal />

      {!user?.username && <LoginModal />}
    </>
  )
}

export default Navbar
