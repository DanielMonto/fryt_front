import React, { createContext, useState } from 'react'

export const NavBarContext = createContext(false)

export function NavBarProvider({ children }) {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false)

    const toggleNavbar = () => {
        setIsNavbarOpen(prevState => !prevState)
    }

    return (
        <NavBarContext.Provider value={{
            toggleNavbar: toggleNavbar,
            isNavbarOpen: isNavbarOpen
        }}>
            {children}
        </NavBarContext.Provider>
    )
}