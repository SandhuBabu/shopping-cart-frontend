import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchModal = () => {

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault()
        const {value} = e.target.term

        if(!value) return

        var button = document.getElementById("close-search");
        navigate(`/search/${value}`)
        button.click();
    }
    return (
        <dialog id="search_modal" className="modal">
            <form onSubmit={handleSearch} className='modal-box absolute top-[5em]'>
                <label className="label">
                    <span className="label-text">Search</span>
                </label>
                <input type="search" placeholder='eg: smartwatch' className='input input-bordered input-primary w-full ' name="term" id="" />
            </form>

            <form method="dialog" className="modal-backdrop">
                <button id='close-search'>close</button>
            </form>
        </dialog>
    )
}

export default React.memo(SearchModal)