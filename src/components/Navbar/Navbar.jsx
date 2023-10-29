import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { LoginModal } from '../index'
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
          <Link to="/" className="font-semibold text-2xl">
            <svg width="240" height="25" viewBox="0 0 350 43.49033168574491" className="css-1j8o68f"><defs id="SvgjsDefs1442"></defs><g id="SvgjsG1443" featurekey="UxBHKT-0" transform="matrix(2.2580647384215067,0,0,2.2580647384215067,-1.9419344960240514,-11.019356181911954)" fill="#6356e5"><path d="M11.21 22.77 q-1.47 1.37 -4.09 1.37 q-3.14 0 -5.26 -1.66 l1.46 -2.12 q0.68 0.54 1.61 0.88 t1.97 0.34 q2.82 0 2.82 -2.56 l0 -0.18 q-1.2 0.98 -3.08 0.98 q-1.74 0 -3.06 -0.73 t-2.02 -1.99 t-0.7 -2.78 q0 -1.54 0.7 -2.79 t2.01 -1.99 t3.07 -0.74 q1.88 0 3.08 0.98 l0 -0.78 l2.96 0 l0 10.02 q0 2.38 -1.47 3.75 z M8.35 16.91 q0.69 -0.39 1.09 -1.08 t0.4 -1.51 q0 -0.84 -0.4 -1.52 t-1.09 -1.07 t-1.53 -0.39 q-1.36 0 -2.19 0.85 t-0.83 2.13 q0 1.32 0.81 2.15 t2.21 0.83 q0.84 0 1.53 -0.39 z M23.98 18.9 q-0.38 0.52 -1.31 0.93 t-2.03 0.41 q-1.7 0 -2.95 -0.76 t-1.91 -2.07 t-0.66 -2.91 t0.66 -2.91 t1.91 -2.07 t2.95 -0.76 q1.14 0 2.01 0.39 t1.33 0.99 l0 -1.14 l2.96 0 l0 11 l-2.96 0 l0 -1.1 z M23.28 12.25 q-0.82 -0.87 -2.2 -0.87 q-1.4 0 -2.21 0.87 t-0.81 2.25 q0 1.34 0.83 2.22 t2.19 0.88 q1.4 0 2.21 -0.83 t0.81 -2.27 q0 -1.38 -0.82 -2.25 z M38.24 18.9 q-0.38 0.52 -1.31 0.93 t-2.03 0.41 q-1.7 0 -2.95 -0.76 t-1.91 -2.07 t-0.66 -2.91 t0.66 -2.91 t1.91 -2.07 t2.95 -0.76 q1.14 0 2.01 0.39 t1.33 0.99 l0 -5.26 l2.96 0 l0 15.12 l-2.96 0 l0 -1.1 z M37.54 12.25 q-0.82 -0.87 -2.2 -0.87 q-1.4 0 -2.21 0.87 t-0.81 2.25 q0 1.34 0.83 2.22 t2.19 0.88 q1.4 0 2.21 -0.83 t0.81 -2.27 q0 -1.38 -0.82 -2.25 z M53.99 22.77 q-1.47 1.37 -4.09 1.37 q-3.14 0 -5.26 -1.66 l1.46 -2.12 q0.68 0.54 1.61 0.88 t1.97 0.34 q2.82 0 2.82 -2.56 l0 -0.18 q-1.2 0.98 -3.08 0.98 q-1.74 0 -3.06 -0.73 t-2.02 -1.99 t-0.7 -2.78 q0 -1.54 0.7 -2.79 t2.01 -1.99 t3.07 -0.74 q1.88 0 3.08 0.98 l0 -0.78 l2.96 0 l0 10.02 q0 2.38 -1.47 3.75 z M51.13 16.91 q0.69 -0.39 1.09 -1.08 t0.4 -1.51 q0 -0.84 -0.4 -1.52 t-1.09 -1.07 t-1.53 -0.39 q-1.36 0 -2.19 0.85 t-0.83 2.13 q0 1.32 0.81 2.15 t2.21 0.83 q0.84 0 1.53 -0.39 z M61.23 19.74 q-1.37 -0.54 -2.35 -1.83 t-0.98 -3.37 t0.99 -3.36 t2.37 -1.82 t2.62 -0.54 q1.44 0 2.74 0.64 t2.13 1.88 t0.87 2.94 q0 0.52 -0.02 0.9 t-0.04 0.48 l-8.68 0 q0.24 1.16 1.2 1.58 t1.8 0.42 q1.08 0 1.72 -0.39 t1.1 -0.89 l2.32 1.34 q-1.88 2.56 -5.14 2.56 q-1.28 0 -2.65 -0.54 z M61.839999999999996 12.05 q-0.78 0.61 -0.88 1.49 l5.5 0 q-0.06 -0.52 -0.4 -1 t-0.91 -0.79 t-1.29 -0.31 q-1.24 0 -2.02 0.61 z M75.74 16.08 q0 0.7 0.24 1.17 t1.12 0.47 q0.4 0 0.76 -0.04 l0 2.52 q-0.72 0.08 -1.34 0.08 q-1.28 0 -2.07 -0.21 t-1.23 -0.81 t-0.44 -1.72 l0 -6.1 l-1.34 0 l0 -2.62 l1.34 0 l0 -2.94 l2.96 0 l0 2.94 l2.2 0 l0 2.62 l-2.2 0 l0 4.64 z M90.07 22.77 q-1.47 1.37 -4.09 1.37 q-3.14 0 -5.26 -1.66 l1.46 -2.12 q0.68 0.54 1.61 0.88 t1.97 0.34 q2.82 0 2.82 -2.56 l0 -0.18 q-1.2 0.98 -3.08 0.98 q-1.74 0 -3.06 -0.73 t-2.02 -1.99 t-0.7 -2.78 q0 -1.54 0.7 -2.79 t2.01 -1.99 t3.07 -0.74 q1.88 0 3.08 0.98 l0 -0.78 l2.96 0 l0 10.02 q0 2.38 -1.47 3.75 z M87.21 16.91 q0.69 -0.39 1.09 -1.08 t0.4 -1.51 q0 -0.84 -0.4 -1.52 t-1.09 -1.07 t-1.53 -0.39 q-1.36 0 -2.19 0.85 t-0.83 2.13 q0 1.32 0.81 2.15 t2.21 0.83 q0.84 0 1.53 -0.39 z M94.52000000000001 4.880000000000001 l3 0 l0 15.12 l-3 0 l0 -15.12 z M108.72 18.9 q-0.38 0.52 -1.31 0.93 t-2.03 0.41 q-1.7 0 -2.95 -0.76 t-1.91 -2.07 t-0.66 -2.91 t0.66 -2.91 t1.91 -2.07 t2.95 -0.76 q1.14 0 2.01 0.39 t1.33 0.99 l0 -1.14 l2.96 0 l0 11 l-2.96 0 l0 -1.1 z M108.02 12.25 q-0.82 -0.87 -2.2 -0.87 q-1.4 0 -2.21 0.87 t-0.81 2.25 q0 1.34 0.83 2.22 t2.19 0.88 q1.4 0 2.21 -0.83 t0.81 -2.27 q0 -1.38 -0.82 -2.25 z M131.05 10.04 q1.13 1.24 1.13 3.46 l0 6.5 l-3.02 0 l0 -6.5 q0 -1.18 -0.59 -1.7 t-1.55 -0.52 q-0.8 0 -1.44 0.6 t-0.66 2 l0 6.12 l-3.02 0 l0 -6.5 q0 -1.18 -0.59 -1.7 t-1.53 -0.52 q-0.86 0 -1.49 0.64 t-0.63 2.26 l-0.02 5.82 l-2.98 0 l0 -11 l2.98 0 l0 1 q0.58 -0.52 1.4 -0.86 t1.5 -0.34 q2.32 0 3.54 1.5 q0.62 -0.7 1.54 -1.1 t2 -0.4 q2.3 0 3.43 1.24 z M137.73000000000002 19.49 q-1.37 -0.77 -2.17 -2.09 t-0.8 -2.88 q0 -1.54 0.8 -2.86 t2.17 -2.09 t2.99 -0.77 t3 0.77 t2.19 2.09 t0.81 2.86 q0 1.56 -0.81 2.88 t-2.19 2.09 t-3 0.77 t-2.99 -0.77 z M139.20000000000002 11.83 q-0.7 0.41 -1.1 1.12 t-0.4 1.57 q0 0.9 0.39 1.61 t1.08 1.12 t1.55 0.41 q0.84 0 1.53 -0.41 t1.09 -1.13 t0.4 -1.6 q0 -0.86 -0.4 -1.57 t-1.09 -1.12 t-1.53 -0.41 q-0.82 0 -1.52 0.41 z M154.4 11.87 q-0.86 0.21 -1.58 0.99 t-0.72 2.28 l0 4.86 l-2.98 0 l0 -11 l2.98 0 l0 1.46 q0.74 -0.98 1.81 -1.33 t1.95 -0.33 l0 2.92 q-0.6 -0.06 -1.46 0.15 z"></path></g></svg>
          </Link>
        </div>
        
        <button onClick={handleSearchOpenClick} className="btn btn-ghost btn-circle">
        </button>
        
        <NavRight />
      </div>
      <SearchModal />
      {!user?.username && <LoginModal />}
    </>
  )
}

export default Navbar