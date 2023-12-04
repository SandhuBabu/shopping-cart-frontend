import React from 'react'

const Modal = ({
    isOpen,
    cancel,
    action,
    actionText,
    actionLabel,
    actionLabelVariant,
    children
}) => {

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
                backgroundColor: 'rgba(0,0,0,0.6)',
                height: '100vh'
            }}
            className='opacity-1 z-[99] w-full h-[100%] fixed left-0 top-0 bottom-0 px-6 flex items-center justify-center'
        >
            <div className='w-full md:w-[30em]  rounded-lg bg-base-300 px-8 py-6 overflow-hidden'>
                {
                    actionText ?
                        <h1 className='text-xl my-4'>
                            {actionText}
                        </h1>
                        :
                        children
                }

                <div className='float-right my-3'>
                    <button onClick={() => {
                        document.querySelector('body').style.overflowY = "auto";
                        cancel();
                    }} className='mr-6'>Cancel</button>
                    <button
                        className={actionLabelVariant ?? `text-base-content`}
                        onClick={() => {
                            cancel()
                            document.querySelector('body').style.overflowY = "auto"
                            action()
                        }}
                    >{actionLabel}</button>
                </div>
            </div>
        </section>
    )
}

export default React.memo(Modal)