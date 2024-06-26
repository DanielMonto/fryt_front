import React, { useContext } from 'react'
import { AuthContext } from '@/contexts/Auth'
import NavBarLogged from './navbars/NavBarLogged'
import NavBarUnlogged from './navbars/NavBarUnlogged'

function NavBar() {
    const { logged } = useContext(AuthContext)
    if (logged) {
        return <NavBarLogged/>
    }
    return <NavBarUnlogged/>
}

export default NavBar