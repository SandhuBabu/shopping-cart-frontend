import React, { useEffect } from 'react'

const Modal = ({ isOpen, cancel, action, actionText, actionLabel, actionLabelVariant }) => {

    if (isOpen) {
        document.body.style.height = "100vh"
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.height = "auto"
        document.body.style.overflow = "auto"
    }

    return (
        <section
            style={{
                visibility: isOpen ? 'visible' : 'hidden',
                backgroundColor: 'rgba(0,0,0,0.6)'
            }}
            className='opacity-1 z-[99] w-full h-[100%] absolute left-0 top-0 px-6 flex items-center justify-center'
        >
            <div className='w-[65%] md:w-[30em] transform translate-y-[4em] rounded-lg bg-base-300 px-8 py-6'>
                <h1 className='text-xl my-4'>{actionText}</h1>

                <div className='float-right my-3'>
                    <button onClick={cancel} className='mr-6'>Cancel</button>
                    <button
                        className={actionLabelVariant??`text-base-content`}
                        onClick={action}
                    >{actionLabel}</button>
                </div>
            </div>
        </section>
    )
}

export default React.memo(Modal)