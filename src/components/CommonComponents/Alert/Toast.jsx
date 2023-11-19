import React from 'react'

const Toast = ({ children, variant }) => {
    return (
        <div className="toast toast-bottom mb-5 mr-5 toast-end z-[9] p-0">
            <div className={`alert bg-${variant}-300 border-0 text-black`}>
               {children}
            </div>
        </div>
    )
}

export default React.memo(Toast)