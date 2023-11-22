import React from 'react'

const Count = ({ count, handleIncrement, handleDecrement, max }) => {
    return (
        <div className='my-4'>
            <button
                onClick={handleDecrement}
                className='btn btn-secondary btn-square btn-sm'
                disabled={count===1}
            >
                -
            </button>
            <span
                className='mx-4 font-medium'
            >
                {count}
            </span>
            <button
                onClick={handleIncrement}
                className='btn btn-secondary btn-square btn-sm'
                disabled={count === max}
            >
                +
            </button>
        </div>
    )
}

export default Count