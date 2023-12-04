import React from 'react'

const Rating = ({ rating, orderId, handleRating }) => {

const handleChange = (e) => {
    handleRating(e, orderId)
} 

    return (
        <div className="rating">
            <input
                type="radio" name={`rating-${orderId}`}
                className={`mask mask-star bg-primary ${rating===0&&'opacity-[0.2]'}`}
                value={1}
                checked={rating === 1}
                onChange={handleChange}
            />
            <input
                type="radio" name={`rating-${orderId}`}
                className={`mask mask-star bg-primary ${rating===0&&'opacity-[0.2]'}`}
                value={2}
                checked={rating === 2}
                onChange={handleChange}
                />
            <input
                type="radio" name={`rating-${orderId}`}
                className={`mask mask-star bg-primary ${rating===0&&'opacity-[0.2]'}`}
                value={3}
                checked={rating === 3}
                onChange={handleChange}
            />
            <input
                type="radio" name={`rating-${orderId}`}
                className={`mask mask-star bg-primary ${rating===0&&'opacity-[0.2]'}`}
                value={4}
                checked={rating === 4}
                onChange={handleChange}
            />
            <input
                type="radio" name={`rating-${orderId}`}
                className={`mask mask-star bg-primary ${rating===0&&'opacity-[0.2]'}`}
                value={5}
                checked={rating === 5}
                onChange={handleChange}
            />
        </div>
    )
}

// export default React.memo(Rating)
export default Rating