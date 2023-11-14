import React from 'react'

const Alert = ({ text, close, type="bg-red-400" }) => {
    return (
        <div className='flex justify-center sticky top-[6em] right-8 z-[9]'>
            <div className={`flex rounded-lg px-3 min-w-[30em] w-max py-2 text-black ${type}`}>
                <svg onClick={close} xmlns="http://www.w3.org/2000/svg" className="stroke-current cursor-pointer shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className='flex-1 text-center'>{text}</span>
            </div>
        </div>
    )
}

export default React.memo(Alert)