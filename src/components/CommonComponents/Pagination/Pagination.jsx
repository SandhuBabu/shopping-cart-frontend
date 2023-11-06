import React from 'react'

const Pagination = ({ details, handleNext, handlePrev }) => {
    return (
        <div className='w-full flex justify-center items-center mt-8 gap-6'>
            <button className="btn btn-sm" disabled={details?.first}>1</button>
            <button
                className="btn btn-sm"
                disabled={details?.first}
                onClick={handlePrev}
            >«</button>
            <p>. . .</p>

            <p className='btn btn-sm btn-primary'>
                {details?.pageNo}
            </p>

            <p>. . .</p>

            <button
                className="btn btn-sm"
                disabled={details?.last}
                onClick={handleNext}
            >»</button>

            <button className="btn btn-sm" disabled={details?.last}>{details.totalPages}</button>
        </div>
    )
}

export default React.memo(Pagination)