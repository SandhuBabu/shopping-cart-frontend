import React from 'react'

export const Button = ({children, classNames, onClick, ...rest}) => {
  return (
    <button className={classNames} onClick={onClick} {...rest}>
        {children}
    </button>
  )
}
