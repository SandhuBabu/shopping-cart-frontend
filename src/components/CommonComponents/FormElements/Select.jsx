import React, { forwardRef } from 'react'

const Select = forwardRef(
    ({ name, title, options, classNames, defaultValue, onChange, disabled }, ref) => {

    return (
        <div className="form-control w-full mt-4">
            <label className="label capitalize">
                <span className="label-text">{title}</span>
            </label>
            <select name={name}
                defaultValue={defaultValue ?? ''}
                onChange={onChange}
                className={"select select-primary w-full capitalize " + classNames}
                required
                disabled={disabled}
                ref={ref}
            >
                <option disabled>Choose {title}</option>
                {
                    options.map((opt, k) => {
                        return <option value={opt?.title} key={k}>{opt?.title}</option>
                    })
                }
            </select>

        </div>
    )
})

export default React.memo(Select)