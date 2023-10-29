import React from 'react'

const SearchModal = () => {
    const handleSearch = (e) => {
        e.preventDefault()
        console.log("searched");
    }
    return (
            <dialog id="search_modal" className="modal">
            <form onSubmit={handleSearch} className='modal-box absolute top-[5em]'>
                <label className="label">
                    <span className="label-text">Search</span>
                </label>
                <input type="search" placeholder='eg: smartwatch' className='input input-bordered input-primary w-full ' name="" id="" />
            </form>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default React.memo(SearchModal)