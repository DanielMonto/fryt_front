import React, { useContext } from 'react'
import { AuthContext } from '@/contexts/Auth'
import NavBarLogged from './navbars/NavBarLogged'
import NavBarUnlogged from './navbars/NavBarUnlogged'

function NavBar() {
    const { logged } = useContext(AuthContext)
    return logged ? <NavBarLogged/> : <NavBarUnlogged/> 
}

export default NavBar