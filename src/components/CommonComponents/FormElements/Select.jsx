import React from 'react'

const Select = ({ name, title, options, classNames }) => {
    return (
        <div className="form-control w-full mt-4">
            <label className="label capitalize">
                <span className="label-text">{title}</span>
            </label>
            <select name={name}
                className={"select select-primary w-full capitalize " + classNames}
                required
            >
                <option disabled>Choose {title}</option>
                {
                    options.map(opt => {
                        return <option key={opt}>{opt}</option>
                    })
                }
            </select>

        </div>
    )
}

export default React.memo(Select)