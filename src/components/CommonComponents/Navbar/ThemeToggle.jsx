import React, { useState } from 'react'


let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches


const ThemeToggle = () => {


    const handleThemeChange = () => {
        const htmlTag = document.documentElement;

        if (isDarkMode) {
            htmlTag.setAttribute("data-theme", "light")
            isDarkMode = false
            return
        }

        if (!isDarkMode) {
            htmlTag.setAttribute('data-theme', "dark")
            isDarkMode = true
        }
    }

    return (
        <div className='w-full h-full flex items-center'>
            <p>Switch Theme</p>
            <input type="checkbox"
                onChange={handleThemeChange}
                className="toggle theme-controller"
            />
        </div>
    )
}

export default React.memo(ThemeToggle)